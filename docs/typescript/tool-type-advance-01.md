---
outline: deep
---

# 类型编程进阶

## 递归

```typescript
type PromiseValue<T> = T extends Promise<infer V> ? PromiseValue<V> : T;
```

## 属性修饰进阶

### 递归修饰

extends 判断 + 递归

```typescript
type DeepPartial<T extends object> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

export type DeepRequired<T extends object> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired<T[K]> : T[K];
};
```

同理可实现: DeepReadonly, DeepMutable, DeepNonNullable...

### 已知属性的部分修饰

拆分对象结构【拆分】`=>` 递归属性修饰【操作】`=>` 交叉类型【组合】

```typescript
/**
 * Partia<Pick<T, K>> 取了一部分变为可选
 * Omit<T, K> 去除了标记为可选的属性 K
 * 然后使用交叉类型合并两部分
 */
export type MarkPropsAsOptional<
  T extends object,
  K extends keyof T = keyof T
> = Partial<Pick<T, K>> & Omit<T, K>;
```

同理可实现: MarkPropsAsRequired, MarkPropsAsReadonly, MarkPropsAsMutable 等

## 结构工具类型进阶

基于键值类型的 Pick 和 Omit:

```typescript
type FuncStruct = (...args: any[]) => any;

/**
 * { [K in keyof T]: T[K] extends FuncStruct ? K : never; }
 * 该部分返回了 { key: key | never } 结构
 *
 * 加上 [keyof T] 这一索引类型查询 + keyof 操作符的组合通过分布式条件类型的方式
 * 返回了预期类型的属性名
 */
type FunctionKeys<T extends object> = {
  [K in keyof T]: T[K] extends FuncStruct ? K : never;
}[keyof T];

// advance
type ExpectedPropKeys<T extends object, ValueType> = {
  [Key in keyof T]-?: T[Key] extends ValueType ? Key : never;
}[keyof T];

// 拿到期望类型的子结构
type PickByValueType<T extends object, ValueType> = Pick<
  T,
  ExpectedPropKeys<T, ValueType>
>;

// 同理可以实现 OmitByValueType, 先构造过滤工具类型 FilteredPropKeys
type FilteredPropKeys<T extends object, ValueType> = {
  [Key in keyof T]-?: T[Key] extends ValueType ? never : Key;
}[keyof T];

type OmitByValueType<T extends object, ValueType> = Pick<
  T,
  FilteredPropKeys<T, ValueType>
>;
```

## 基于结构的互斥工具类型

```typescript:line-numbers=1
// 取差集然后用 never 标记属性
type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
// 约束不能同时拥有这个条件: 两个类型的差异属性不能同时共存
type XOR<T, U> = (Without<T, U> & U) | (Without<U, T> & T);

// example
interface VIP {
  number: string;
  vipExpires: number;
}

interface commonUser {
  number: string;
  promotionUsed: boolean;
}

type XORUser = XOR<VIP, commonUser>;

const user1: XORUser = {
  name: "luxiaxue",
  vipExpires: 0,
};

const user2: XORUser = {
  name: 'lixiuxian'
  promotionUsed: false
}


// error: vipExpires 和 promotionUsed 至少有一个
const user3: XORUser = { name: 'user3' } // [!code error]

// error: vipExpires 和 promotionUsed 不能同时拥有
const user4: XORUser = { name: 'user3', vipExpires: 0, promotionUsed: false } // [!code error]

// more: 实现绑定, 要么同时拥有, 要么都没有
type XORStruct = XOR<
  {},
  {
    foo: string;
    bar: number;
  }
>;
```
