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

## 参考

- [mongoose 链接](<https://mongoosejs.com/docs/api/document.html#Document.prototype.populate()>)
