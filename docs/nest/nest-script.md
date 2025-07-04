---
outline: deep
---

# Nest 环境变量/打包参考

## 环境变量

### 创建不同环境的 .env 文件

```txt
.env.development
.env.production
.env.test
```

### 开发时从不同环境启动

```json
"scripts": {
  "start:dev": "NODE_ENV=development nest start --watch",
  "start:prod": "NODE_ENV=production node dist/main"
}
```

### 不同环境的打包方式

使用 `cross-env` 设置环境变量

```json
"scripts": {
  "build:dev": "cross-env NODE_ENV=development nest build",
  "build:prod": "cross-env NODE_ENV=production nest build"
}
```

## 使用

### 使用 .env 文件

前提：安装 `@nest/config` 插件

```ts
ConfigModule.forRoot({
  envFilePath: `.env.${process.env.NODE_ENV}`,
});
```

### 使用配置文件

或者可以使用配置文件：

```ts
ConfigModule.forRoot({
  load: [() => import(`./config/${process.env.NODE_ENV}`)],
});
```

### 在代码中使用环境变量

在 `main.ts` 中使用：

```ts
const configService = app.get(ConfigService);
const port = configService.get<number>("PORT");
```

在需要使用配置的地方，注入 `ConfigService` 并使用：

```ts
constructor(private configService: ConfigService) {}

someMethod() {
  const apiKey = this.configService.get<string>('API_KEY');
  // 使用 apiKey...
}
```

### 实例：TypeOrmModule 注入时使用环境变量

```typescript
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      validationSchema: configValidationSchema,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const isProduction = configService.get("STAGE") === "prod";

        return {
          ssl: isProduction,
          extra: {
            ssl: isProduction ? { rejectUnauthorized: false } : null,
          },
          type: "postgres",
          autoLoadEntities: true,
          synchronize: true,
          host: configService.get("DB_HOST"),
          port: configService.get("DB_PORT"),
          username: configService.get("DB_USERNAME"),
          password: configService.get("DB_PASSWORD"),
          database: configService.get("DB_DATABASE"),
        };
      },
    }),
  ],
})
export class AppModule {}
```
