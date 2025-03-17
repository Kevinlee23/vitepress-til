---
outline: deep
---

# 利用 JWT 来做身份验证

## 安装 JWT 相关包

`yarn add @nestjs/jwt`

## 创建身份验证模块

这里使用硬编码模拟了用户查找，实际项目中还是需要使用数据库持久化存储

```ts
import { Injectable } from "@nestjs/common";

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: "john",
      password: "changeme",
    },
    {
      userId: 2,
      username: "maria",
      password: "guess",
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
```

将身份验证服务 `export` 出去供其他模块调用

```ts
import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";

@Module({
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
```

## JWT 使用

### 注入 JWT 模块

在 认证模块 `(auth module)` 中注入 `jwt module`

```ts {10-14}
// jwt 令牌
const jwtConstants = {
  secret:
    "DO NOT USE THIS VALUE. INSTEAD, CREATE A COMPLEX SECRET AND KEEP IT SAFE OUTSIDE OF THE SOURCE CODE.",
};

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "60s" },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
```

### 验证 token

创建 `auth.guard`, 验证请求是否携带 认证 `token`

```ts
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request); // 从请求头拿到 token, 格式为 Bearer Token
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request["user"] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}
```

### login 和 getProfile 实现

在认证模块中实现 `login` 和 `getProfile(get token)`

```ts
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post("login")
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @UseGuards(AuthGuard)
  @Get("profile")
  getProfile(@Request() req) {
    return req.user; // 返回 token 验证后的身份信息
  }
}

// AuthService
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService, // 注入账号密码 - 身份验证服务
    private jwtService: JwtService // 注入 jwt 服务
  ) {}

  async signIn(
    username: string,
    pass: string
  ): Promise<{ access_token: string }> {
    // 模拟数据库查找用户，校验密码
    const user = await this.usersService.findOne(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }

    // payload after implement of the auth.contoller.getProfile
    // token <--> payload 具有一对一对应关系
    const payload = { sub: user.userId, username: user.username };

    // 登陆后返回 token 给前端
    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
```

## 全局绑定与公开路由

### 全局绑定

通过 `providers` 可以绑定一整个 `module`

```ts
@Module({
  // ...
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AuthModule {}
```

### 公开路由

需要一个标记手段来将部分路由跳过 `auth.guard`

```ts
import { SetMetadata } from '@nestjs/common';

// 使用装饰器来给特定公开路由进行标记
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

// public route
@Public()
@Post()
login() {
  // logic...
}
```

改造 `auth.guard`:

```ts {2,4-12}
export class AuthGuard implements CanActivate {
  // 注入了反射器 reflector 来获取 controller/handler 上的 metadata
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      // 💡 See this condition
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request["user"] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
}
```
