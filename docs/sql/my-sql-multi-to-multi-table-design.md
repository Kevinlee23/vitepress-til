# 多对多的表设计

## 设计方式

多对多的表设计，例如：文章表 (`Article`) 和标签表 (`Tag`)

通过一个中间表：文章-标签表 (`Article-Tag`) 来关联

文章-标签表设置两个主键 (`article_id`, `tag_id`) 作为复合主键，然后分别将这两个主键设置外键 映射到文章表的 `id` 和 标签表的 `id`,
中间表的级联方式 (`on delete`, `on update`) 必须设置为 `CASCADE`

## 基本操作

三个表进行 `join on` 操作:

```sql
SELECT t.name AS 标签名, a.title AS 文章标题
    FROM article a
    JOIN article_tag at ON a.id = at.article_id
    JOIN tag t ON t.id = at.tag_id
    WHERE a.id = 1
```