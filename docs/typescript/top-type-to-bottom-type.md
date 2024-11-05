# 从 top type 到 bottom type

## 原始类型

> Basic: 字面量类型 < 对应的原始类型

```typescript
type Result1 = "luxiaxue" extends string ? 1 : 2; // 1
type Result2 = 1 extends number ? 1 : 2; // 1
type Result3 = true extends boolean ? 1 : 2; // 1
type Result4 = { name: string } extends object ? 1 : 2; // 1
type Result5 = { name: "luxiaxue" } extends object ? 1 : 2; // 1
type Result6 = [] extends object ? 1 : 2; // 1
```

## 联合类型

> Basic: 字面量类型 < 包含此字面量类型的联合类型、原始类型 < 包含此原始类型的联合类型

```typescript
type Result7 = 1 extends 1 | 2 | 3 ? 1 : 2; // 1
type Result8 = "lu" extends "lu" | "xia" | "xue" ? 1 : 2; // 1
type Result9 = true extends true | false ? 1 : 2; // 1
type Result10 = string extends string | false | number ? 1 : 2; // 1
```

同一基础类型的字面量联合类型 < 此基础类型

```typescript
type Result11 = 'lu' | 'xia' | 'xue' extends string ? 1 : 2 // 1
type Result12 = {} | (() => void) | [] extends ? 1 : 2 // 1
```

## 装箱类型

> Basic: 原始类型 < 原始类型对应的装箱类型 < Object 类型

```typescript
type Result13 = string extends String ? 1 : 2; // 1
type Result14 = String extends {} ? 1 : 2; // 1
type Result15 = {} extends object ? 1 : 2; // 1
type Result16 = object extends Object ? 1 : 2; // 1
```

> Why String extends {}

引申出结构化系统的内容，假设我们把 String 看做一个普通的对象，上面存在一些方法，那么这个普通对象就是对空对象 ({}) 的继承，方法实现...

> 特殊的结论, {} extends object 和 object extends {}

```typescript
type Result15 = {} extends object ? 1 : 2; // 1
type Result17 = object extends {} ? 1 : 2; // 1
```

上述两种比较采用的是两种不同的方式：
`{} extends obejct` 意味着 {} 是 object 的字面量类型，是从类型信息的层面出发的，即字面量在基础类型之上提供了更详细的类型信息

而 `object extends {}` 则是从结构化类型系统的比较出发的，即 {} 作为一个空对象，几乎可以被视作所有类型的基类

## Top type

> Basic: Object < any / unknown

```typescript
type Result18 = Object extends any ? 1 : 2; // 1
type Result19 = Object extends unknown ? 1 : 2; // 1

type Result20 = any extends Object ? 1 : 2; // 1 | 2
type Reuslt21 = unknown extends Object ? 1 : 2; // 2

type Result22 = any extends unknown ? 1 : 2 // 1
type Result23 = unknown extends any ? 1 : 2 // 1
```

可以看到 Result 20 出现了一个奇怪的结果 1 | 2, 这是因为 any 在作为条件判断时同时包含让条件成立的一部分和让条件不成立的一部分，即 `(condition true | condition false)`

## Bottom type

> never < 字面量类型

```typescript
type Result24 = never extends 'luxiaxue' ? 1 : 2 // 1

type Result25 = undefined extends 'luxiaxue' ? 1 : 2 // 2
type Result26 = null extends 'luxiaxue' ? 1 : 2 // 2
type Result27 = void extends 'luxiaxue' ? 1 : 2 //2
```

后面三个例子中, void, undefined, null 都是有实际意义的类型