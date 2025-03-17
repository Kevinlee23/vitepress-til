# markdown 片段

> vscode 中实用的 markdown 片段

- `ctrl + shfit + p`
- 输入：配置用户代码片段
- 选中：`markdown.json`

```json
{
  "H1": {
    "prefix": "/1",
    "body": ["# $0"]
  },
  "H2": {
    "prefix": "/2",
    "body": ["## $0"]
  },
  "H3": {
    "prefix": "/3",
    "body": ["### $0"]
  },
  "H4": {
    "prefix": "/4",
    "body": ["#### $0"]
  },
  "H5": {
    "prefix": "/5",
    "body": ["##### $0"]
  },
  "H6": {
    "prefix": "/6",
    "body": ["###### $0"]
  },
  "bold粗体": {
    "prefix": "/b",
    "body": ["**$1**$2"]
  },
  "italic斜体": {
    "prefix": "/i",
    "body": ["*$1*$2"]
  },
  "underline下划线": {
    "prefix": "/u",
    "body": ["<u>$1</u>$2"]
  },
  "line-through删除线": {
    "prefix": "/x",
    "body": ["~~$1~~$2"]
  },
  "divider分割线": {
    "prefix": "/d",
    "body": ["------", "$1"]
  },
  "link链接": {
    "prefix": "/k",
    "body": ["[$2]($1)$3"]
  },
  "image图片": {
    "prefix": "/img",
    "body": ["![$2]($1)$3"]
  },
  "inline code行内代码": {
    "prefix": "/cl",
    "body": ["`$1`$2"]
  },
  "code block代码片段": {
    "prefix": "/c",
    "body": ["```$1", "$0", "```"]
  },
  "ul 有序列表": {
    "prefix": "/ul",
    "body": ["- $0"]
  },
  "ol 无序列表": {
    "prefix": "/ol",
    "body": ["1. $0"]
  },
  "task 任务列表": {
    "prefix": "/task",
    "body": ["- [ ] $0"]
  },
  "quote 引用": {
    "prefix": "/q",
    "body": ["> $1", "$2"]
  },
  "table 表格": {
    "prefix": "/t",
    "body": [
      "|  $1  |  $2  |  $3  |  $4  |",
      "| ---- | ---- | ---- | ---- |",
      "|  $5  |  $6  |  $7  |  $8  |",
      "|  $9  |  $10 |  $11 |  $12 |",
      "|  $13 |  $14 |  $15 |  $16 |"
    ]
  },
  "bash 代码片段": {
    "prefix": "/bash",
    "body": ["```bash", "$0", "```"]
  },
  "html 代码片段": {
    "prefix": "/html",
    "body": ["```html", "$0", "```"]
  },
  "js 代码片段": {
    "prefix": "/js",
    "body": ["```js", "$0", "```"]
  },
  "css 代码片段": {
    "prefix": "/css",
    "body": ["```css", "$0", "```"]
  },
  "vue 代码片段": {
    "prefix": "/vue",
    "body": ["```vue", "$0", "```"]
  }
}
```
