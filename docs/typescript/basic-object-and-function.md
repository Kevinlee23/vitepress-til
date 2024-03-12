---
outline: deep
---

# 类型声明

## 原始类型

```ts
const name: string = "luxiaxue";
const age: number = 26;
const isMale: boolean = true;
const undef: undefined = undefined;
const nul: null = null;
const obj: object = { name, age, isMale };
const bigintVar: bigint = BigInt(9007199254740991);
const symbolVar: symbol = Symbol("unique");
```

## 数组类型的标注

```ts
const arr1: string[] = [];

const arr2: Array<string> = [];

// 元组
const arr3: [string, string, string] = ["lu", "xia", "xue"];
console.log(arr3[4]); // error

// 元组, 位置可选
const arr4: [string, number?, boolean?] = ["luxiaxue"];
const arr5: [string, number?, boolean?] = ["luxiaxue", , ,];
```

## 对象的类型标注

### Basic

```ts
interface IUser {
  readonly name: string;
  age: number;
  isMale: boolean;
  city?: string;
}

// or

type User = {
  readonly name: String;
  age: number;
  isMale: boolean;
  city?: string;
};

const user1: IUser = {
  name: "luxiaxue",
  age: 26,
  isMale: true,
};

user1.name = "李修贤"; // error
```

### interface 和 type

推荐使用：`interface 用来描述对象、类的结构，而类型别名用来将一个函数签名、一组联合类型、一个工具类型等等抽离成一个完整独立的类型`

异同点:

- 在对象扩展情况下，`interface` 使用 `extends` 关键字，而 `type` 使用`交叉类型（&）`
- 同名的 `interface` 会自动合并，并且在合并时会要求兼容原接口的结构
- `interface` 与 `type` 都可以描述对象类型、函数类型、`Class` 类型，但 `interface` 无法像 `type` 那样表达元组、一组联合类型等等
- `interface` 无法使用映射类型等类型工具，也就意味着在类型编程场景中我们还是应该使用 `type`

## 函数声明

```ts
function foo(name: string): string {
  return `Hello, ${name}`;
}

const foo1 = function (name: string): string {
  return `Hello, ${name}`;
};

const foo2 = (name: string): string => {
  return `Hello, ${name}`;
};

// 可选参数与 rest 参数
const foo3 = (name: string, age: number, city?: string, ...rest): string => {
  console.log(...rest);
  return `Hello, i'm ${name}, ${city ? "and" : ""} ${age} years old${
    city ? "and living" + city : "."
  }`;
};

// 异步函数
async function getList(url, data): Promise<void> {
  return request.post({ url, data });
}
```

## 对象声明

```ts
interface IUserProp {
  readonly name: string;
  age: number;
  isMale: boolean;
  city?: string;
}

class User {
  private name: string;
  age: number;
  isMale: boolean;
  city: string;

  constructor(props: IUserProp) {
    const { name, age, isMale, city } = props;
    this.name = name;
    this.age = age;
    this.isMale = isMale;
    this.city = city;
  }

  public get myName(): string {
    return this.name;
  }

  public set myName(val) {
    this.name = val;
  }

  protected print() {
    console.log(
      `Hello, i'm ${name}, ${city ? "and" : ""} ${age} years old${
        city ? "and living" + city : "."
      }`
    );
  }
}
```
