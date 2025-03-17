# DTO 映射类型

数据传输对象`（DTO）(Data Transfer Object)`, 是一种设计模式之间传输数据的软件应用系统

当构建 `CRUD` 等功能时，在基本实体类型上构建变体通常很有用，`Nest` 提供了几个使用函数来执行类型转换

## 基本类型

```ts
class Person {
  id: string;
  name: string;
  age: number;
  sex: string;
}
```

## Pick

选取一组属性来构造一个新类型

```ts
import { PickType } from "@nestjs/mapped-types";
import { Person } from "../entities/person.entity";

export class CreatePersonDto extends PickType(Person, ["age", "name", "sex"]) {}
```

## Particial

创建具有相同字段都是可选的新类型

```ts
import { PartialType } from "@nestjs/mapped-types";
import { CreatePersonDto } from "./create-person.dto";

export class UpdatePersonDto extends PartialType(CreatePersonDto) {}
```

## Omit

从输入类型中选取所有属性，然后删除一组特定的键来构造一个新类型

`CreatePersonDto`

```ts
import { OmitType } from "@nestjs/mapped-types";
import { Person } from "../entities/person.entity";

export class CreatePersonDto extends OmitType(Person, ["id"]) {}
```

## Intersection

将两种类型合并成一种新类型

```ts
import { CreatePersonDto } from "./create-person.dto";
import { IntersectionType } from "@nestjs/mapped-types";

export class AdditionalStudentInfo {
  major: string;
}

export class UpdatePersonDto extends IntersectionType(
  CreateCatDto,
  AdditionalStudentInfo
) {}
```

## Combine

组合式

```ts
import { OmitType, PartialType } from "@nestjs/mapped-types";
import { CreatePersonDto } from "./create-person.dto";

export class UpdateCatDto extends PartialType(
  OmitType(CreatePersonDto, ["name"] as const)
) {}
```
