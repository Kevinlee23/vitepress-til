---
outline: deep
---

# mock - DPD

`DPD` 是 `mock` 中的数据占位符，格式为：

- `@占位符`
- `@占位符(参数, [, 参数])`

**tips**:

- 用 `@` 来标识其后的字符串是占位符
- 占位符引用的是 `Mock.Random` 中的方法
- 可以通过 `Mock.Random.extend()` 来扩展自定义占位符
- 占位符 可以 也会 优先引用数据模板中的属性
- 占位符支持相对路径和绝对路径

## 常用占位符示例

### **var**

- `@boolean`
- `@integer( min?, max? )`
- `@float( min?, max?, dmin?, dmax? )`
- `@character( pool? )`
- `@string( pool?, min?, max?)`

### **time**

- `@now`

- `@now('yyyy-MM-dd A HH:mm:ss')`

- `@datetime()`

- `@datetime('yyyy-MM-dd A HH:mm:ss')`

### **color**

`@color`, `@hex`, `@rgb`, `@rgba`, `@hsl`

### **text**

- `@paragraph(min?, max?)`
- `@sentece(min?, max?)`
- `@word(min?, max?)`
- `@title(min?, max?)`
- `cparagraph`, `csentence`, `cword`, `ctitle`

### **name**

- `@first()` 姓
- `@last()` 名
- `@name(middle?)` 是否含有中间名
- `cfirst`, `clast`, `cname`

### **address**

- `@region` 地区
- `@province` 省份
- `@city( prefix? )` 城市
- `@county( prefix? )` 乡镇
- `@zip`
- `@email`

### **id**

`@id, @guid`

### **web**

`@ip`, `@email`, `@protocol`, `@domain`, `@url`
