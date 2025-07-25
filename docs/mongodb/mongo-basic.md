# Mongo 基础操作

> 使用 mongoose 操作 db
>
> 基础操作备忘

## 数组键值插入

```js
const value = 4;
const array = [1, 2, 3];

// 插入多值
Model.updateOne({ _id }, { $addToSet: { key: { $each: array } } });
// 插入单个值
Model.updateOne({ _id }, { $addToSet: { key: 4 } });
```

## 数组键值删除

```js
const value = 4;
const array = [1, 2, 3];

// 删除多值
Model.updateOne({ _id }, { $pull: { key: { $in: array } } });
// 删除单个值
Model.updateOne({ _id }, { $pull: { key: value } });
```

## 使用 js 对象

> 当不需要对 document 进行操作时
>
> 可以使用 .lean() 将 document 转换为 js object

```js
const existingPhotos = await this.photoModel
  .find(
    { _id: { $in: photos } },
    { _id: 1 } // 只返回 _id 字段
  )
  .lean();
```

## 模糊查询

```typescript
const filter = { name: "snowinlu" };

const query: any = {};

query.name = { $regex: filter.name, $options: "i" };

Model.find(query).exec();
```
