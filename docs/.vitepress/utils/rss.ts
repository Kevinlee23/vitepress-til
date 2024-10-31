import { dirname } from "path";
import fg from "fast-glob";
import fs from "fs-extra";
import matter from "gray-matter";
import MarkdownIt from "markdown-it";
import type { FeedOptions, Item } from "feed";
import { Feed } from "feed";

const DOMAIN = "https://tech.snowinlu.top";
const AUTHOR = {
  name: "Snowinlu",
  email: "snowinlu@gmail.com",
  link: DOMAIN,
};
const OPTIONS: FeedOptions = {
  title: "Snowinlu",
  description: "Snowinlu'blog",
  id: `${DOMAIN}/`,
  link: `${DOMAIN}/`,
  copyright: "MIT License",
  feedLinks: {
    json: `${DOMAIN}/vitepress-til` + "/feed.json",
    atom: `${DOMAIN}/vitepress-til` + "/feed.atom",
    rss: `${DOMAIN}/vitepress-til` + "/feed.xml",
  },
  author: AUTHOR,
  image: `${DOMAIN}/assets/cola.svg`,
  favicon: `${DOMAIN}/assets/favion.ico`,
};

const markdown = MarkdownIt({
  html: true,
  breaks: true,
  linkify: true,
});

export async function buildBlogRSS() {
  const posts = await generateRSS();
  writeFeed("feed", posts);
}

async function generateRSS() {
  // 增加新笔记分类时需要在这里增加文件夹
  const folders = [
    "javascript",
    "typescript",
    "css",
    "vue3",
    "react",
    "react-native",
    "nest",
    "nuxt",
    "next",
    "config",
    "fix",
    "mark",
    "ordinary",
    "http",
    "git",
    "sql",
    "mongodb",
    "oss",
    "docker",
    "3-party-library",
    "ops",
    "pmp",
    "echarts",
  ];

  // 读取笔记分类的文件
  const files = await fg(folders.map((item) => "docs/" + item + "/*.md"));

  let posts: any[] = (
    await Promise.all(
      files
        .filter((i) => !i.includes("index"))
        .map(async (i) => {
          const raw = await fs.readFile(i, "utf-8");
          const { data, content } = matter(raw);
          const html = markdown
            .render(content)
            .replace('src="/', `src="${DOMAIN}/`);

          return {
            ...data,
            date: data.date ? new Date(data.date) : "",
            content: html,
            author: [AUTHOR],
            link: `${DOMAIN}/${i.replace(".md", "").replace('docs/', '')}`,
          };
        })
    )
  ).filter(Boolean);

  // 只有带日期的笔记归类到 rss 页面（方便排序）
  // 从 rss 功能上线日期开始计算 (2022-10-10)
  posts = posts.filter((item) => item.date);
  posts.sort((a, b) => +new Date(b.date) - +new Date(a.date));
  return posts;
}

async function writeFeed(name: string, items: Item[]) {
  const feed = new Feed(OPTIONS);
  items.forEach((item) => feed.addItem(item));

  await fs.ensureDir(dirname(`./.vitepress/dist/${name}`));
  await fs.writeFile(
    `./docs/.vitepress/dist/${name}.xml`,
    feed.rss2(),
    "utf-8"
  );
}
