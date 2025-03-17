# 类型系统里的逻辑运算

## extend: 条件运算

```ts
type StringOrNumber<T> = T extends string ? "string" : "number";
```

## infer: 提取操作

```ts
// 提取函数参数类型
type GetParamsType<T> = T extends (...args: infer P) => any ? P : never;

// 提取返回类型
type GetReturnType<T> = T extends (...args: any) => infer R ? R : never;

// 提取数组内任意位置的值
type ExtractStartAndEnd<T extend any[]> = T extends [infer A, ...any[], infer B] ? [A, B] : T;
type Swap<T extends any[]> = T extends [infer A, infer B] ? [B, A] : [T]
type ArrayItemType<T> = T extends Array<infer ElementType> ? ElementType : never;

// 作用于对象
type PropType<T, K extends keyof T> = T extends { [Key in K]: infer R } ? R : never;

// 作用于 Promise
type PromiseValue<T> = T extends Promise<infer V> ? V : T;
type PromiseValue2<T> = T extends Promise<infer V> ? promiseValue2<V> : T;
```

## 分布式条件类型

条件类型分布式起作用的条件：

- 类型参数是联合类型
- 类型参数通过泛型参数传入，不能直接进行条件判断
- 泛型参数不能被包裹

```typescript
type Condition<T> = T extends 1 | 2 | 3 ? T : never;

type Res1 = Condition<1 | 2 | 3 | 4 | 5>; // 1 | 2 | 3

type Naked<T> = T extends boolean ? "Y" : "N";
type Wrapped<T> = [T] extends [boolean] ? "Y" : "N";

type Res2 = Naked<number | boolean>; // 'N' | 'Y'
```

对于是否包裹的条件，使用数组包裹是其中一种，还可以用以下方式：

`export type NoDistribute<T> = T & {}`

## 判断 never 和 any 的方法

由于分布式条件类型的存在，我们需要一些 trick 去绕过它，进而判断 never 和 any

```ts
type IsNver<T> = [T] extends [never] ? true : false;

type IsAny<T> = 0 extends 1 & T ? true : false; // 1 & any => any

// 满足 unknown extends T 的只有 any 和 unknown, 用于收窄类型
type IsUnknown<T> = unknown extends T
  ? IsAny<T> extends true
    ? false
    : true
  : false;
```
