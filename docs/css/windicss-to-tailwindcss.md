# windicss to tailwindcss

例子：利用正则表达式分组的功能来迁移 `windicss` 至 `tailwindcss`

(w|h|min-w|max-w|min-h|max-h|top|right|left|bottom){1}-(\d+)px
->
$1-[$2px]

p([xyrltb])?-(\d+)px
->
p$1-[$2px]

m([xyrltb])?-(\d+)px
->
m$1-[$2px]

leading-(\d+)px
->
leading-[$1px]

text-(\d+)px
->
text-[$1px]

border(-[xyrltb])?-(\d+)px
->
border$1-[$2px]
