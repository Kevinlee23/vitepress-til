---
outline: deep
---

# OpenAPI - Swagger 接入

## 安装

`pnpm add @nest/swagger`

项目启动后，`api` 文档默认会在：`localhost:port/api` 页面

## 引入

```ts
const config = new DocumentBuilder()
  .setTitle("Learn-Project") // 项目标题
  .setDescription("学习用项目 swagger") // 项目描述
  .setVersion("0.1.0") // 版本
  .addTag("Users") // tags
  .addTag("Auth")
  .addTag("blog")
  .addTag("comment")
  .build();

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup("api", app, document);
```

## 具体装饰器

针对 `class` / `handler`:

```ts
@ApiTags("User") // 接口分类
@Controller("user")
class UserController {
  @ApiOperation({ summary: "api describe" })
  @ApiOkResponse({
    content: {
      // 接口成功返回后的示例
      "Application/json": {
        example: {
          code: 200,
          message: "create new user success",
          data: { id: 123 },
        },
      },
    },
  })
  @Post("create")
  @ApiBody({ type: [CreateUserDto] }) // 显示设置泛型或接口的元数据
  create(@Body() usersDto: CreateUserDto[]) {
    // logic...
  }
}
```

针对 `dto`:

`api` 文档中会自动读取 `dto` 类

```ts
export enum UserRole {
  Admin = "Admin",
  User = "User",
}

// 增加了 ApiProperty 装饰器的属性将会在 api 文档中体现
export class CreateUserDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;

  // 识别枚举
  @ApiProperty({ enum: ["Admin", "User"] })
  role: UserRole;

  // 手动指明数组类型
  @APiproperty({ type: [String] })
  major: string[];

  // 枚举可以与 @ApiQuery, @Query 装饰器结合使用
  // @ApiQuery({ name: "role", enum: UserRole })
  // filterByRole(@Query("role") role: UserRole = UserRole.User) {}
}
```

## 针对 token 使用

### 1. 常用的方法

配置：

```typescript {5-15}
const config = new DocumentBuilder()
  .setTitle("Your API")
  .setDescription("API description")
  .setVersion("1.0")
  .addBearerAuth(
    {
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
      name: "JWT",
      description: "Enter JWT token",
      in: "header",
    },
    "JWT-auth" // 这个名称要与 @ApiBearerAuth() 中的名称对应
  )
  .build();
```

在需要 token 的接口中注明：

```typescript
@Controller("user")
export class UserController {
  constructor() {}

  @ApiBearerAuth("JWT-auth")
  @Get("profile")
  @Roles(RolesEnum.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  getUserInfo(@Query("username") username: string) {}
}
```

### 2. 非标准的自定义 Bearer token

配置：

```typescript
const config = new DocumentBuilder()
  .setTitle("Your API")
  .setDescription("API description")
  .setVersion("1.0")
  .addApiKey(
    {
      type: "apiKey",
      name: "X-API-KEY", // 你的自定义 header 名称
      in: "header",
    },
    "apiKey" // 这个名称要与 @ApiSecurity() 中的名称对应
  )
  .build();
```

受保护的路由：

```typescript
@ApiTags("Protected")
@ApiSecurity("apiKey") // 自定义安全方案名称
@Controller("protected")
export class ProtectedController {
  // 你的受保护路由
}
```

### 3. 直接附加在 header 上

```typescript
@ApiTags("Protected")
@ApiHeader({
  name: "Authorization",
  description: "Auth token",
})
@Controller("protected")
export class ProtectedController {
  // 你的受保护路由
}
```

## 启用 cli 插件

`cli` 插件将：

- 自动注释 `DTO` 属性
- 根据问号设置 `required` 属性
- 根据类型设置 `type` 或 `enum` 属性
- 根据分配的默认值设置 `default` 属性
- 根据 `class-validator` 装饰器设置几个验证规则
- 根据注释为属性生成示例值
- ...

开启：

```json
// nest-cli.json

{
  "collection": "@nestjs/schematics",
  "sourceRoot": "src",
  "compilerOptions": {
    "plugins": ["@nestjs/swagger"]
  }
}
```

自定义插件行为：

```json
{
  "plugins": [
    {
      "name": "@nestjs/swagger",
      "options": {
        "dtoFileNameSuffix": ["dto.ts", ".entity.ts"], // dto 文件后缀
        "controllerFileNameSuffix": ".controller.ts", // 控制器文件后缀
        "classValidatorShim": true, // 如果为 true, 模块将重用 验证装饰器 class-validator
        "dtoKeyOfComment": "description", // 用于在 ApiProperty 上设置注释文本的属性键 for dto
        "controllerKeyOfComment": "description", // 用于在 ApiProperty 上设置注释文本的属性键 for controller
        "introspectComments": true // 如果为 true, 插件将根据注释为属性生成描述值和示例值
        // ...
      }
    }
  ]
}
```

具体内容见：[链接](https://nest.nodejs.cn/openapi/cli-plugin)
