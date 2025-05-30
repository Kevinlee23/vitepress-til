---
outline: deep
date: 2025-05-29
---

# 全属性 attr

> 截止 2025/5/29 chrome133 开始支持全属性 attr

## 写法

`attr(<attr-name> <attr-type>? , <fallback-value>?)`

- attr-name: 属性名称
- attr-type: 属性类型
- fallback: 回退值

属性类型参考：

- \<angle\>
- \<basic-shape\>
- \<blend-mode\>
- \<color\>
- \<custom-ident\>
- \<filter-function\>
- \<flex\>
- \<frequency\>
- \<gradient\>
- \<image\>
- \<integer\>
- \<length\>
- \<number\>
- \<percentage\>
- \<position\>
- \<ratio\>
- \<resolution\>
- \<shape-box\>
- \<single-transition-timing-function\>
- \<string\>
- \<time\>
- \<transform-function\>
- \<url\>
- type(\*)

## 示例

### #1 通用匹配：

> 类似于原子化框架的功能，现在可以用全属性 attr 来做

past:

```css
.m0 { margin: 0; }
.ml0 { margin-left: 0; }
.ml1 { margin-left: .25rem; }
.ml2 { margin-left: .5rem; }
.ml3 { margin-left: .75rem; }
.ml4 { margin-left: 1rem; }
.mt0 { margin-top: 0; }
.mt1 { margin-top: .25rem; }
.mt2 { margin-top: .5rem; }
.mt3 { margin-top: .75rem; }
.mt4 { margin-top: 1rem; }
.mr0 { margin-right: 0; }
.mr1 { margin-right: .25rem; }
.mr2 { margin-right: .5rem; }
.mr3 { margin-right: .75rem; }
.mr4 { margin-right: 1rem; }
.mb0 { margin-bottom: 0; }
.mb1 { margin-bottom: .25rem; }
.mb2 { margin-bottom: .5rem; }
.mb3 { margin-bottom: .75rem; }
.mb4 { margin-bottom: 1rem; }
```

now:

```css
[m] { margin: attr(m px, 0); }
[ml] { margin-left: attr(ml px, 0); }
[mt] { margin-top: attr(ml px, 0); }
[mr] { margin-right: attr(mr px, 0); }
[mb] { margin-bottom: attr(mb px, 0); }
```

```html
<div>
  <div>first</div>
  <!-- 保持 10px 的边距 -->
  <div ml="10">second</div>
</div>
```

### #2 特定类匹配：

```css
/* <div class="button" bgColor="#EEE" p="10">Button</div> */
.button {
  --bgcolor: attr(bgColor type(*), #000);
  
  padding: attr(p, px, 0);
  background-color: var(--bgcolor);
}
```

