# Mongo 中的多表联查

## 表结构

`blog`

```ts
export type BlogDocument = HydratedDocument<Blog>;

export type Music = {
  src: string;
  poster?: string;
  name: string;
  artist?: string;
  lyric?: string;
  album?: string;
};

@Schema()
export class Blog {
  content: string;

  likeNum?: number;

  address?: string;

  imageList?: string[];

  musicList?: Music[];

  createDate: string;

  createTime: string;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
```

`comment`

```ts
export type CommenDocument = HydratedDocument<Comment>;

@Schema()
export class Comment {
  parentId?: string;

  parantName?: string;

  content: string;

  authorName: string;

  authorEmail: string;

  isOriginal: boolean;

  createDate: string;

  createTime: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
```

## 关联表

```ts
export class Blog {
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }] })
  commentIds: Comment[];
}

export class Comment {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Blog" })
  blogId: Blog;
}
```

## 关联表操作

查找 `blog` 列表时，通常操作的结果如下：

```json
{
  "_id": {
    "$oid": "6629cb98b40578481252ff68"
  },
  "content": "这是一篇博客",
  "likeNum": 10,
  "imageList": [],
  "musicList": [
    //...
  ],
  "createDate": "2024-04-25",
  "createTime": "2024-04-25 11:18:48",
  "commentIds": ["6629d4d69e4518a42aac99d9", "662a1b4078b25e11672b0f24"],
  "__v": 0
}
```

查找到的 `comments` 是 `id` 形式，如果需要将具体的映射到字段上，需要使用 `populate` 操作：

```ts
this.blogModel
  .find()
  .sort({ createTime: -1 })
  .skip((page - 1) * size)
  .limit(size)
  .populate({ path: "commentIds", options: { strictPopulate: false } }) // 这一步是映射操作
  .exec();

// 也可以通过 select 字段选取想要的属性
// populate({ path: "commentIds", select "authorName, content", options: { strictPopulate: false } })
```

同理，查找某个 `blog` 的评论的操作如下：

```ts
this.blogModel.findOne({ _id: blogId }).populate({
  path: "commentIds",
  options: {
    skip: (page - 1) * size,
    limit: size,
    sort: { createTime: -1 },
  },
});

console.log(blog.commentIds);
```

## 多重投影

> 假设有用户表，角色表和权限表，是 1:1:n 的关系
>
> 即通过 user.roleRef.permissions 的链路获取到用户的权限
>
> 我们可以通过多重投影的方式拿到

```ts
const user: User = await this.userModel
  .findOne({ username })
  .populate({
    path: "roleRef",
    populate: { path: "permissions" },
  })
  .exec();
```

## 投影后做过滤

> 某张 Model 对另一个 Model 的引用，我这里将它称为 ref(refs), 例如 album 表上，封面字段 (cover) 引用了照片表的的 document, 写作 coverRef
> 
> 在投影后，我们可能需要对 ref(refs) 进行属性的筛选或者分页

属性筛选：

```typescript
const query = this.albumModel
  .find({}, { photos: 0 })
  .populate({ path: "coverRef", options: { select: { imageUrl: 1 } } });
```

分页：

```typescript
const album = await this.albumModel
  .findOne({ _id })
  .populate("coverRef")
  .populate({
    path: "photos",
    options: {
      skip: 0,
      limit: 10,
      sort: { createTime: -1 }, // 按创建时间降序排列
    },
  });
```

## 参考

- [mongoose 链接](<https://mongoosejs.com/docs/api/document.html#Document.prototype.populate()>)
