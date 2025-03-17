# 类型断言

## 使用 unknown 代替 any

any 的本质是类型系统中的顶级类型，即 `Top Type`, 它的万能性也导致我们经常滥用它，为了避免我们将 typescript 使用成 anyscript, 请遵守以下 tips:

- 如果是类型不兼容报错导致你使用 any, 考虑用类型断言替代
- 如果是类型太复杂导致你不想全部声明而使用 any, 考虑将这一处的类型去断言为你需要的最简类型。如你需要调用 foo.bar.baz(), 就可以先将 foo 断言为一个具有 bar 方法的类型
- 如果你是想表达一个未知类型，更合理的方式是使用 unknown

```ts
let foo: unknown;

foo.bar
  .baz()(
    // error: 对象类型为 unknown

    foo as { bar: { baz: () => {} } }
  )
  .bar.baz();
```

## 双重断言

当使用类型断言时，原类型与断言类型之间差异过大，ts 会给出一个报错

```ts
const str: string = "luxiaxue";

(str as { handler: () => {} }).handler(); // [!code error] error

(str as unknown as { handler: () => {} }).handler(); // [!code highlight] right
```

## 非空断言

```ts
declare const foo: {
  func?: () => {
    prop?: number | null;
  };
};

// prop 在 func 调用结果中不一定存在，且可能为 null, 会有类型报错
foo.func().prop.toFixed();

// 非空断言的运行时仍然会保持调用链，因此在运行时可能会报错
foo.func!().prop!.toFixed();
```

## 总结

类型断言的工作原理也和类型层级有关，在判断断言是否成立，即差异是否能接受时，实际上判断的即是这两个类型是否能够找到一个公共的父类型

如果找不到具有意义的公共父类型，这个时候就需要请出 Top Type 了，如果我们把它先断言到 Top Type, 那么就拥有了公共父类型 Top Type, 再断言到具体的类型也是同理。你可以理解为先向上断言，再向下断言
