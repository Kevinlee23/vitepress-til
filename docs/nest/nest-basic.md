---
outline: deep
---

# Nest 基本概念

## `AOP` 切面：

从 `controller -> service -> respository` 这个过程中有五种方式的 AOP:
- middleware
- guard
- pipe
- interceptor
- exceptionFilter

```txt
Request --> Middleware --> Guard --> pipe -> handler --> Exception Filter --> Response
                                 |---- Interceptor ----|
```

## Middleware 中间件

中间件是在路由处理程序之前调用的函数，一般用于处理通用逻辑

## Guard 路由守卫

守卫有单一的责任。它们根据运行时存在的某些条件（如权限、角色、ACL 等）确定给定请求是否将由路由处理程序处理。这通常称为`授权`

## Interceptor 拦截器

- 在方法执行之前/之后绑定额外的逻辑
- 转换函数返回的结果
- 转换函数抛出的异常
- 扩展基本功能行为
- 根据特定条件完全覆盖函数（例如，出于缓存目的）

## Pipe 管道

在参数传给 `handler` 之前对参数做一些`验证`和`转换`:

- 转型：将输入数据转换为所需的形式
- 验证：评估输入数据，如果有效，只需将其原样传递；否则抛出异常

`pipe` 中抛出异常后，由异常层处理，不会执行任何控制器方法

## Handler 执行逻辑

`controller` 下的路由执行函数

## Exception 异常 & Exception filter 异常过滤器

`Nest` 带有一个内置的异常层，负责处理应用中所有未处理的异常。当你的应用代码未处理异常时，该层会捕获该异常，然后自动发送适当的用户友好响应
