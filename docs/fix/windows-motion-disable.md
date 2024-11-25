---
date: 2024-11-25 15:45:00
---

# 解决 windows 系统下部分 css 动画失效的问题

最近工作需要，考察了前端的 css 动画库，在和同事调研 tailwindcss-motion 这个库的时候，同事问我,他的一些动画没有生效，经过各方面排查（环境，依赖，设置等）都没有发现问题，最后询问了万能的 ai 引擎才得出了结论:

是他的电脑重装系统后动画设置被关闭了

解决方法:

在 windows 的设置界面搜索 `动画`:

![enable](/images/windows-motion-disable.png)

打开 `在 windows 中显示动画` 的设置