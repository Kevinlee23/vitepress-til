import { dirname } from "path";
import fg from "fast-glob";
import fs from "fs-extra";
import matter from "gray-matter";
import MarkdownIt from "markdown-it";
import type { FeedOptions, Item } from "feed";
import { Feed } from "feed";

const DOMAIN = "https://kevinlee23.github.io";
const AUTHOR = {
  name: "Snowinlu",
  email: "snowinlu@gmail.com",
  link: DOMAIN + "/vitepress-til/",
};
const OPTIONS: FeedOptions & {
  follow_challenge: { feedId: String; userId: String };
} = {
  title: "Snowinlu",
  description: "Snowinlu'blog",
  id: `${DOMAIN}/`,
  link: `${DOMAIN}/vitepress-til/`,
  copyright: "MIT License",
  feedLinks: {
    json: `${DOMAIN}/vitepress-til` + "/feed.json",
    atom: `${DOMAIN}/vitepress-til` + "/feed.atom",
    rss: `${DOMAIN}/vitepress-til` + "/feed.xml",
  },
  author: AUTHOR,
  image: `${DOMAIN}/vitepress-til/cola.svg`,
  favicon: `${DOMAIN}/vitepress-til/cola.svg`,
  follow_challenge: {
    feedId: "67106239831281664",
    userId: "41284129985304576",
  },
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

  const files = await fg(folders.map((item) => "docs/" + item + "/*.md"));

  const posts: any[] = (
    await Promise.all(
      files
        .filter((i) => !i.includes("index"))
        .map(async (i) => {
          const raw = await fs.readFile(i, "utf-8");
          const { data, content } = matter(raw);
          const html = markdown
            .render(content)
            .replace('src="/', `src="${DOMAIN}/vitepress-til/`);

          return {
            ...data,
            date: data.date ? new Date(data.date) : '',
            content: html,
            author: [AUTHOR],
            link: `${DOMAIN}/vitepress-til/${i.replace(".md", ".html")}`,
          };
        })
    )
  ).filter(Boolean);

  posts.filter((item) => item.date);
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
