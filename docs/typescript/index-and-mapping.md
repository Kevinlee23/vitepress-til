# 索引类型和映射类型

## 索引类型

- 索引签名类型
- 索引类型查询
- 索引类型访问

### 索引签名类型

```ts
interface AllStringType {
  [key: string]: string;
}
```

### 索引类型查询

```ts
interface User {
  name: string;
  age: number;
  sex: string;
}

keyof A // 'name' | 'age' | 'sex'
```

### 索引类型访问

```ts
interface NumberRecord {
  [key: string]: number;
}

type PropType = NumberRecord[string]; // number

// 在未声明索引签名类型的情况下，不能使用 User[string] 这种原始类型的访问方式
type PropType2 = User[string]; // [!code error]

// 只能通过键名的字面量类型访问
type PropNameType = User["name"]; // string
type PropTypeUnion = User[keyof User]; // string | number
```

## 映射类型

```ts
type Stringify<T> = {
  [K in keyof T]: string;
};

interface Foo {
  prop1: string;
  prop2: number;
  prop3: boolean;
  prop4: () => void;
}

type StringifiedFoo = Stringify<Foo>;

// 等价于
interface StringifiedFoo {
  prop1: string;
  prop2: string;
  prop3: string;
  prop4: string;
}

// 遍历类型 T 的索引 K，进行类型复制
type Clone<T> = {
  [K in keyof T]: T[K];
};
```
