# 序列化数据

> 有时候我们定义的实体类中有一些敏感数据应该始终从响应中排除，如：密码，所以需要做额外的转换

## 排除属性

```typescript
export class UserEntity {
  id: number;
  firstName: string;
  lastName: string;

  @Exclude()
  password: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
```

直接使用拦截器处理：

```typescript
@UseInterceptors(ClassSerializerInterceptor)
@Get()
findOne(): UserEntity {
  return new UserEntity({
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    password: 'password',
  });
}
```

**Waning**: 这种情况只适用于直接返回该类的实例

手动处理：

```typescript
  @Get('profile')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  getUserInfo(@Query('username') username: string) {
    const _user = this.userService.findOne(username);

    if (!_user) {
      return { code: 500, message: 'The user is not find' };
    } else {
      const serializedUser = plainToInstance(User, _user);
      return { message: 'success', data: serializedUser };
    }
  }
```

## 转换

> 可以使用 @Transform() 装饰器执行其他数据转换

例如，以下构造返回 RoleEntity 的名称属性，而不是返回整个对象

```typescript
export class User {
  @Transform(({ value }) => value.name)
  role: RoleEntity;
}

const serializedUser = plainToInstance(User, _user);
// or
// @UseInterceptors(ClassSerializerInterceptor)
// handler() {}
```
