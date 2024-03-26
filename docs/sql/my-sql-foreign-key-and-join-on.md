# 外键和关联查询

## 表设计

主表 `user` 照常设置

关联表 `id_card`, 新增一个属性 `user_id`, 将其设置为外键映射到 `user` 表的 `id` 属性

## 基本语法:

`select * from user join id_card on user.id = id_card.user_id // user_id 为 id_card 表上关联 user 表的外键`

格式:

- `join...on...` 默认为内关联，只返回两个表中能关联上的数据
- `left join...on...` 左关联，额外返回左表中没有关联上的数据
- `right join...on...` 右关联，额外返回右表中没有关联上的数据

## 删除和更新时的级联操作

当设置时的 `on update` 属性 和 `on delete` 属性设置为：

- `CASCADE`: 主表主键更新，从表关联记录的外键跟着更新，主表记录删除，从表关联记录删除
- `SET NULL`: 主表主键更新或者主表记录删除，从表关联记录的外键设置为 `null`
- `RESTICT`: 只有没有从表的关联记录时，才允许删除主表记录或者更新主表记录的主键 `id`
- `NO ACTION`: 同 `RESTRICT` （在 `mysql` 中）