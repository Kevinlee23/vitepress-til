# 内置工具类型

## 属性修饰工具类型

```ts
type Partial<T> = {
  [P in keyof T]?: T[P];
};

type Required<T> = {
  [P in keyof T]-?: T[P];
};

type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
```

## 结构工具类型

```ts
// 一般使用 Record<string, unknown> 和 Record<string, any> 来代替 object
type Record<K extends keyof any, T> = {
  [P in K]: T;
};

type Dictionary<T> = {
  [index: string]: T;
};

type NumericDictionary<T> = {
  [index: number]: T;
};

// K extends keyof T 保证 联合类型 K 中的键值都是从 T 中来的
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

// Exclude<A, B> 联合类型 A 中不存在于 B 中的部分
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
```

## 集合工具类型

```ts
/**
 * 交集和差集是利用联合类型的分布式特性完成的
 */
// 交集 Intersection
type Extract<T, U> = T extends U ? T : never;

// 差集 Exclude
type Exclude<T, U> = T extends U ? never : T;

// 并集
type Concurrence<A, B> = A | B;

// 补集
type Complement<A, B extends A> = Exclude<A, B>;

// 相较于 null | undefined 的差集
type NonNullable<T> = Exclude<T, null | undefiend>;
```

## 模式匹配工具类型

```ts
// 函数模式匹配
type FunctionType = (...args: any) => any;

type Parameters<T extends FunctionType> = T extends (...args: infer P) => any
  ? P
  : never;

type ReturnType<T extends FunctionType> = T extends (...args: any) => infer R
  ? R
  : any;

// Class 模式匹配
type ClassType = abstract new (...args: any) => any;

type ConstructorParameters<T extends ClassType> = T extends abstract new (
  ...args: infer P
) => any
  ? P
  : never;

type InstanceType<T extends ClassType> = T extends abstract new (
  ...args: any
) => infer R
  ? R
  : any;
```

## infer 约束

```ts
// 提取数组第一个类型
type FirstArrayItemType<T extends any[]> = T extends [infer P, ...any[]]
  ? P
  : never;

// 判断数组第一个是不是特定类型, 是则提取
type FirstArrayItemType<T extends any[]> = T extends [infer P extends string, ...any[]]
  ? P
  : never;
```
