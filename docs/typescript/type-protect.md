---
date: 2024-11-04 15:00
---


# 类型保护

## typeof

适用于: string, number, boolean 和 symbol

```typescript
const str: string = 'hello, wolrd'
typeof str === 'string' // true
```

不能用于判断对象类型(包括数组和函数)，结果都为 object

## instanceof

用来检测对象是否是某个类的实例，适用于类和对象的类型保护

```typescript
class Dog {
  bark: () {
    console.log('汪汪汪')
  }
}

const animal: Dog

animal instanceof Dog // true
```

## in

in 操作符用于检查对象是否包含某个属性，适用于对象的类型保护

```typescript
if ('bark' in animal) {
  console.log('这是一个会叫的动物')
  animal.bark()
}
```

## 字面量类型守卫

```typescript
type Pet = "cat" | "dog";

function getPetSound(pet: Pet) {
  if (pet === "cat") {
    return "Meow";
  } else if (pet === "dog") {
    return "Woof";
  }
}
```

## 自定义类型守卫

```typescript
function isDog(animal: Dog | Other): animal is Dog {
  return (animal as Dog).bark !== undefiend;
}

isDog(animal) // true
```