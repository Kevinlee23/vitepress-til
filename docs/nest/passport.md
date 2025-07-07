# 通行证（认证）

> passport 结合 jwt 可以为 RESTful API 服务器实现一个完整的端到端身份验证解决方案

## 安装扩展包

```bash
$ pnpm add @nestjs/passport passport passport-local
$ pnpm add --save @types/passport-local
```

## passport strategy

```typescript
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository, // 这里使用了 typeorm 注入的数据库实体
    private configService: ConfigService
  ) {
    super({
      secretOrKey: configService.get("JWT_SECRET"), // 使用 config 注入 jwt 秘钥
      // 提供从 Request 中提取 JWT 的方法。我们将使用标准方法在 API 请求的授权标头中提供不记名令牌
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { username } = payload; // jwt 载荷
    const user: User = await this.usersRepository.findOne({ username });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
```

## 注册 passportModule

```typescript
@Module({
  imports: [
    ConfigModule,
    // 这里也可以使用默认策略 { defaultStrategy: 'jwt' }
    PassportModule.register({}),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get("JWT_SECRET"),
        signOptions: {
          expiresIn: 3600,
        },
      }),
    }),
    TypeOrmModule.forFeature([UsersRepository]),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [JwtStrategy, PassportModule],
});
export class AuthModule {}
```

## 登录时生成 jwt 载荷

```typescript
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private jwtService: JwtService // from '@nestjs/jwt'
  ) {}

  async signIn(
    authCredentialsDto: AuthCredentialsDto
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialsDto;
    const user = await this.usersRepository.findOne({ username });

    // 这里比较了加密下的密码数据
    if (user && (await bcrypt.compare(password, user.password))) {
      // 生成 jwt 载荷
      const payload: JwtPayload = { username };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException("Please check your login credentials");
    }
  }
}
```

## 在需要用户认证的模块进行守卫

```typescript
// 如果 passportModule 注册时指定了默认的策略名，这里可以不填写：AuthGuard()
@UseGuards(AuthGuard("jwt"))
export class TasksController {}
```

## tip: 可以定义一个装饰器用来快速提取策略返回的数据

```typescript {13}
export const CurrentUser = createParamDecorator(
  (_data, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  }
);

// 使用
@Controller("tasks")
@UseGuards(AuthGuard())
export class TasksController {
  @Get("/:id")
  getTaskById(
    @Param("id") id: string,
    @CurrentUser() user: User
  ): Promise<Task> {
    return this.tasksService.getTaskById(id, user);
  }
}
```
