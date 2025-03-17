# 基于 RBAC 的授权

:::code-group

```ts [decorator]
import { SetMetadata } from "@nestjs/common";

// 角色定义
export enum Role {
  User = "user",
  Admin = "admin",
}

// 元数据定义
export const ROLES_KEY = "roles";
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
```

```ts [controller]

// 在控制器中，给路由处理函数附加元数据
@Controller('person')
export class PersonController() {
  @Roles(Role.Admin) // [!code highlight]
  @UseGuards(AuthGuard, RolesGuard) // [!code highlight] // 用户登录守卫，角色权限守卫
  @Post('create')
  create() {
    // logic...
    // 经过路由守卫后，当前用户具有要求的角色，执行路由逻辑
  }
}
```

```ts [guard]
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    /**
     * describe: 通过 reflector 来获取路由处理函数或者控制器 Class 上附加的元数据
     * 有针对性的对于某些路由处理函数进行覆盖：使用 getAllAndOverride
     * 如果需要合并：使用 getAllAndMerge
     * 如果只是简单的读取：使用 get
     */
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // logic...
    // 检查当前用户是否符合角色，进行拦截或放行
  }
}
```

:::
