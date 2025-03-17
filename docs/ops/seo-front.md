# 前端 SEO

## TDK

> title, description, keywords

```html
<title>标题</title>
<meta name="description" content="描述" />
<meta name="keywords" content="关键词" />
```

其中 `keyworkds` 因为滥用问题已经被各大搜索引擎取消了搜索权重

## 使用 meta 标签

使用如下：

- keywords: 逗号分隔的关键词列表
- description: 搜索结果的描述（重要）
- format-detection: 格式检测，禁止识别电话、邮箱等
- robots: 用来告诉机器人哪些页面需要索引，哪些不要
- theme-color: 网站主题色

## 使用语义化标签

- 标题：h1, h2, h3, h4, h5, h6（一个页面最好只有一个 h1）
- 强调标签：strong, em
- 图片标签：使用时带上 alt 属性，对图片进行描述
- 段落标签：p
- 列表标签：ul, ol, li
- 布局标签：header, nav, article, aside, footer

## Open Graph 协议

在 head 中加入一些元数据，当你向其他网站 (facebook 等) 分享链接时，会按照你定义的内容来展示，示例：

```html
<head>
  <title>The Rock (1996)</title>
  <meta property="og:title" content="The Rock" />
  <meta property="og:type" content="video.movie" />
  <meta property="og:url" content="http://www.imdb.com/title/tt0117500/" />
  <meta
    property="og:image"
    content="http://ia.media-imdb.com/images/rock.jpg"
  />
  ...
</head>
```

## 使用服务器渲染

使用 `nuxt, next` 等服务器渲染框架

## 编写站点地图 sitemap

编写站点地图，给网站的每个页面分配权重

## robots.txt 文件

文件用于指定爬虫蜘蛛在网站上的抓取范围：

```txt
# 网站目录下所有文件均能被所有搜索引擎蜘蛛访问*
User-agent: *
Disallow:

# 禁止所有搜索引擎蜘蛛访问网站的任何部分*
User-agent: *
Disallow: /

# 禁止所有的搜索引擎蜘蛛访问网站的几个目录*
User-agent: *
Disallow: /haha/

# 只允许某个搜索引擎蜘蛛访问*
User-agent: Googlebot
Disallow:
```

## 内链和外链

内链：从自己网站指向另一个页面，增加爬虫蜘蛛的广度和深度
外链：从其他页面增加链接指向自己（拒绝低质量的页面）

`nofollow`, `external`:

```html
<!-- nofollow: 忽略这个链接，组织搜索引擎追踪这个链接  -->
<a rel="nofollow" href="http://www.baidu.com/">百度</a>
<!-- external: 告诉搜索引擎这是一个外链，非本站的链接  -->
<a rel="external" href="http://www.baidu.com/">百度</a>
```

## 结构化数据

丰富网站在搜索引擎的展现形式，示例：

```html
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": "Title of a News Article",
    "image": [
      "https://example.com/photos/1x1/photo.jpg",
      "https://example.com/photos/4x3/photo.jpg",
      "https://example.com/photos/16x9/photo.jpg"
    ],
    "datePublished": "2015-02-05T08:00:00+08:00",
    "dateModified": "2015-02-05T09:20:00+08:00",
    "author": [
      {
        "@type": "Person",
        "name": "Jane Doe",
        "url": "https://example.com/profile/janedoe123"
      },
      {
        "@type": "Person",
        "name": "John Doe",
        "url": "https://example.com/profile/johndoe123"
      }
    ]
  }
</script>
```

[参考：google 搜索支持的结构化数据](https://developers.google.com/search/docs/appearance/structured-data/search-gallery?hl=zh-cn)

## 使用 https

## 各搜索引擎提交站点收录

[百度](https://ziyuan.baidu.com/)

[谷歌](https://developers.google.com/search?hl=zh-cn)