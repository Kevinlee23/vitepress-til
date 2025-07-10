---
date: 2025-07-10 15:00:00
---

# 使用 mongoose 接入 mongodb

## Connect

```typescript
export interface DatabaseConfig {
  mongodbUri: string;
  mongodbName: string;
}

export const databaseProviders = [
  MongooseModule.forRootAsync({
    useFactory: async (configService: ConfigService) => {
      return {
        uri: configService.get("MONGODB_URI"),
        dbName: configService.get("MONGODB_NAME"),
      };
    },
    inject: [ConfigService],
  }),
];
```

关于 config 的配置，查阅[章节](/nest/nest-script)

## Scheme

```typescript
export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  username: string;

  @Prop()
  password: string;

  // 类似于外键，引用了另一个 Schema 的 id, 可以通过 populate 映射出数据
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Role" })
  roleId: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
```

关于关联表的操作，查阅[章节](/mongodb/muti-document-query)

## Using in Service

```typescript
export class AuthService {
  constructor(
    // 注入模型
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Role.name) private roleModel: Model<Role>,
    private jwtService: JwtService
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto) {
    // 使用模型 roleModel 和 userModel
    const normarlRole = await this.roleModel.findOne({ name: "normal" });

    const create = new this.userModel({
      ...authCredentialsDto,
      roleId: normarlRole._id,
    });

    create.save();

    return "create success";
  }
}
```
