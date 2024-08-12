---
outline: deep
---

# 概念举例

## 条件类型

### 定义

`SomeType extends OtherType ? TrueType : FalseType;`

### 实战举例

```typescript
interface IdLabel {
  id: number;
}

interface NameLabel {
  name: string;
}

type NameOrId<T extends number | string> = T extends number
  ? IdLabel
  : nameLabel;
```

对泛型进行约束, true 分支返回泛型某一索引的类型, false 分支返回 never:

`type MessageOf<T> = T extends { message: unknown } ? T["message"] : never;`

### 在条件类型中推断

```typescript
type Flatten<T> = T extends any[] ? T[number] : T;

// ↓

type Flatten<T> = T extends Array<infer I> ? I : T;

type GetReturnType<T> = T extends (...args: never[]) => infer R ? R : never;
```

### 分布式条件类型

```typescript
type ToArray<Type> = Type extends any ? Type[] : never;

type StrArrOrNumArr = ToArray<string | number>; // => string[] | number[]

// 避免分布式条件类型
type ToArrayNonDist<T> = [T] extends [any] ? T[] : never;

type StrArrOrNumArr = ToArrayNonDist<string | number>; // => (string | number)[]
```

## 映射类型

### 定义

`[Property in keyof T]: subtype`

### 映射修饰符

```typescript
// 修饰符 readonly, ?
// 映射修饰符行为: + 增加; - 去除

type CreateMutable<T> = {
  -readonly [Property in keyof T]: T[Property]; // 去掉修饰符 readonly
};

type Concrete<T> = {
  [Property in keyof T]-?: T[Property]; // 去掉修饰符 ?
};
```

### 通过 as 关键词重新映射

```typescript
// example one:

interface Person {
  name: string;
  age: number;
  location: string;
}

type Getters<T> = {
  [P in keyof T as `get${Capitalize<string & P>}`]: () => T[P];
};

type LazyPerson = Getters<Person>;
// type LazyPerson = {
//    getName: () => string;
//    getAge: () => number;
//    getLocation: () => string;
// }

// example two:
// 过滤某些属性

interface Circle {
  kind: "circle";
  radius: number;
}

type RemoveKindField<T> = {
  [Property in keyof T as Exclude<Property, "kind">]: T[Property];
};

type KindlessCircle = RemoveKindField<Circle>;
// type KindlessCircle = {
//    radius: number;
// }

// example three:
// 遍历任何联合类型

type EventConfig<Events extends { kind: string }> = {
  [E in Events as E["kind"]]: (event: E) => void;
};

type SquareEvent = { kind: "square"; x: number; y: number };
type CircleEvent = { kind: "circle"; radius: number };

type Config = EventConfig<SquareEvent | CircleEvent>;
// type Config = {
//    square: (event: SquareEvent) => void;
//    circle: (event: CircleEvent) => void;
// }
```

### 搭配 条件类型 extends 使用

```typescript
type ExtractPII<T> = {
  [Property in keyof T]: T[Property] extends { pii: true } ? true : false;
};

type DBFields = {
  id: { format: "incrementing" };
  name: { type: string; pii: true };
};

type ObjectsNeedingGDPRDeletion = ExtractPII<DBFields>;
// type ObjectsNeedingGDPRDeletion = {
//    id: false;
//    name: true;
// }
```

## 模板字面量类型

### 定义

```typescript
type World = "world";
type Greeting = `Hello, ${World}`; // type Greeting = "Hello, World"
```

### 内置字符操作类型

```typescript
// Uppercase, LowerCase, Capitalize, Uncapitalize
type ShoutyGreeting = Uppercase<Greeting>;
type QuietGreeting = Lowercase<Greeting>;
type Greeting = Capitalize<Greeting>;
type UncomfortableGreeting = Uncapitalize<Greeting>;
```
