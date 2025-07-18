---
outline: deep
date: 2025-07-18 15:00:00
---

# 前后端鉴权示例

> jwt 和 通行证三节笔记的扩展

前置：

- [利用 JWT 来做身份验证](/nest/jwt-for-auth)
- [通行证](/nest/passport)
- [常见的通行证策略](/nest/passport-strategy)

## 流程说明

### 1. 登录

- 前端发送用户名密码到 /auth/login
- nest 后端验证并返回 access token 和 refresh token
- 前端储存这两个 token

access token 和 refresh token 本质上都是一样的，都是通过 jwtService.sign 生成，不过是时效不一样

### 2. 访问受保护资源

- 前端在请求头中添加 Authorization: `Bearer <access_token>`
- 后端验证 access token 的有效性 (通过通行证策略)

### 3. access token 过期

- 后端返回 401 状态码
- 前端使用 `Bearer <refresh_token>` 请求 /auth/refresh 获取新的 access token
- 如果 refresh token 也过期，则要求用户重新登录

## Auth 模块

::: code-group

```typescript [module]
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "15m" }, // access token 15分钟过期
    }),
  ],
  providers: [AuthService, JwtStrategy, RefreshTokenStrategy],
  exports: [AuthService],
})
export class AuthModule {}
```

```typescript [service]
@Injectable()
export class AuthService {
  // ...

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload), // 生成 token
      refresh_token: this.generateRefreshToken(user.userId), // 生成 refresh token
    };
  }

  // token 过期, 通过 refresh token 刷新
  async refreshAccessToken(userId: string) {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  private generateRefreshToken(userId: string): string {
    // 通常refresh token有更长的有效期，并且需要单独存储验证
    return this.jwtService.sign(
      { sub: userId },
      {
        secret: process.env.REFRESH_TOKEN_SECRET,
        expiresIn: "7d", // refresh token 7天过期
      }
    );
  }
}
```

```typescript [jwt.strategy]
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
```

```typescript [refresh-token.strategy]
@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  "jwt-refresh"
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.REFRESH_TOKEN_SECRET,
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: any) {
    const refreshToken = req.headers["authorization"].split(" ")[1];
    return { ...payload, refreshToken };
  }
}
```

```typescript [controller]
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("login")
  async login(@Body() body: { username: string; password: string }) {
    const user = await this.authService.validateUser(
      body.username,
      body.password
    );
    if (!user) {
      throw new Error("Invalid credentials");
    }
    return this.authService.login(user);
  }

  @Post("refresh")
  @UseGuards(AuthGuard("jwt-refresh"))
  async refresh(@Request() req) {
    return this.authService.refreshAccessToken(req.user.sub);
  }

  @Post("logout")
  @UseGuards(AuthGuard("jwt"))
  async logout() {
    // 实际应用中可能需要将token加入黑名单
    return { message: "Logged out successfully" };
  }
}
```

:::

## 前端逻辑

### 登录

登录和储存 token

```js
import axios from "axios";

const API_URL = "http://your-api-url.com";

const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      username,
      password,
    });

    const { access_token, refresh_token } = response.data;

    // 存储token
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", refresh_token);

    return true;
  } catch (error) {
    console.error("Login failed:", error);
    return false;
  }
};
```

### 后续 token 处理

刷新 token 逻辑：

```js
const refreshToken = async () => {
  const refreshToken = localStorage.getItem("refresh_token");

  try {
    const response = await axios.post(
      `${API_URL}/auth/refresh`,
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    );

    const { access_token } = response.data;
    localStorage.setItem("access_token", access_token);
    return access_token;
  } catch (error) {
    console.error("Refresh token failed:", error);
    // 刷新失败，跳转到登录页
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    window.location.href = "/login";
    return null;
  }
};
```

Axios 拦截器设置：

- 请求时将 access token 注入到 header 中
- 响应时如果 response.status 为 401 时，使用 refresh token 请求刷新 token

```js
// 请求拦截器
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 响应拦截器
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const newAccessToken = await refreshToken();
      if (newAccessToken) {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newAccessToken}`;
        return axios(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);
```
