---
title: 概念解释
date: 2024-10-11
---

# 概念解释

## YAML

`YAML` 是一个可读性高，用来表达数据序列化的格式，例如 用于 `rss` 的 `md` 中的示例:

```markdown
---
title: 概念解释
date: 2024-10-11
---

content bolow:
...
```

## glob

`glob` 是一种用于匹配文件路径的模式，通常由普通字符和通配符组成。它在多种编程环境中被广泛使用，尤其是在文件操作和搜索中

`glob` 支持几种主要的通配符：
- *: 匹配零个或多个字符。例如, `*.txt` 匹配所有以 `.txt` 结尾的文件
- ?: 匹配任意单个字符。例如, `file?.txt` 可以匹配 `file1.txt` 或 `fileA.txt`
- []: 匹配指定范围内的字符。例如, `[0-9]` 匹配任意数字，而 `[a-z]` 匹配任意小写字母