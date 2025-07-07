# 迭代中正确使用对象键

## Problem

```typescript
type User = {
  name: string;
  age: number;
};

function printUser(user: User) {
  Object.keys(user).forEach((key) => {
    // Error
    // Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'User'
    console.log(user[key]);
  });
}
```

## Solution 1

> Casting to keyof typeof

```typescript
const user = {
  name: "Daniel",
  age: 26,
};

const keys = Object.keys(user);

keys.forEach((key) => {
  console.log(user[key as keyof typeof user]);
});
```

## Solution 2

> 类型保护

```typescript
function isKey<T extends object>(x: T, k: PropertyKey): k is keyof T {
  return k in x;
}

keys.forEach((key) => {
  if (isKey(user, key)) {
    console.log(user[key]);
  }
});
```

## Solution 3

> 将 object.keys 包装在一个返回转换类型值的函数中

```typescript
type User = {
  name: string;
  age: number;
};

const objectKeys = <T extends object>(obj: T) => {
  return Object.keys(obj) as Array<keyof T>;
};

const object: User = {
  name: "daniel",
  age: 26,
};

const keys = objectKeys(object).map((key) => console.log(object[key]));
```
