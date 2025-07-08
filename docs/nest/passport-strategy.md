---
date: 2025-07-08 12:00:00
---

# 常见的通行证策略

> @nest/passport 中官方定义了两个策略，local 和 jwt
> 
> 一般会再加上自定义 jwt-verify 策略

## Local 策略

- 用途：处理传统的用户名/密码认证
- 验证用户提交的用户名和密码
- 通常和 jwt 结合使用，认证成功后办法 token

适用场景：

- 登录页面
- 需要直接验证用户名密码的情况

## JWT 策略

- 用途：验证 JWT 的有效性
- 客户端在 Authorization 头中携带 JWT
  - 使用 `ExtractJwt.fromAuthHeaderAsBearerToken()` 方法获得 `jwtFromRequest`
  - 注入策略类的 `constrctor.super` 中
- 从 token payload 中提取用户的信息

适用场景：

- API 认证
- 已颁发 token 的验证

## JWT-Verify 策略

这个不是 Passport 标准的策略，是对 jwt 策略的自定义扩展

可能的变种：

- 带数据验证的 jwt
  - 验证 token 的同时检查用户是否存在数据库
  - 检查用户状态
- 强制刷新验证
  - 检查 token 是否需要刷新
  - 验证 refresh token
- 增强安全验证
  - 检查 token 是否在黑名单中
  - 验证额外的安全声明
