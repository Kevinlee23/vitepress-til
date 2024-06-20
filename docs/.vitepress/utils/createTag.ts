// 归档标签
export interface TagItem {
  title: string;
  link: string;
}

// 归档标签组
export interface TagGroup {
  groupName: string;
  items: TagItem[];
}

// 特殊归档标签
export interface TagStatus {
  type: string;
  text: string;
}

// 特殊状态: 未完成, 合并到其他文件, 持续更新
export type StautsItem = "BETA" | "MERGED" | "UPDATED" | "";
// 具体分类
export enum TagName {
  Javascript = "Javascript",
  JSCode = "JS Code",
  Typescript = "TypeScript",
  CSS = "CSS",
  TypeCode = "类型编程",
  HTTP = "HTTP",
  Vue3 = "Vue3",
  React = "React",
  ReactNative = "React Native",
  Nuxt = "Nuxt",
  NestJs = "NestJs",
  Git = "Git",
  SQL = "SQL",
  MongoDB = "MongoDB",
  OSS = "OSS",
  Docker = "Docker",
  mockJs = "mockJs",
  Config = "Config",
  ErrorFix = "Error Fix",
  Ordinary = "Ordinary",
}

// 归档链接
export interface Link {
  title: string;
  link: string;
  tagName: TagName;
  createDate: string;
  tagStatus?: StautsItem;
}

// 链接特殊标记
export const tagStatusMap = {
  BETA: { type: "warning", text: "Beta" },
  MERGED: { type: "danger", text: "Merged" },
  UPDATED: { type: "tip", text: "Updated" },
};

export function createTag(): TagGroup[] {
  const res: TagGroup[] = [
    {
      groupName: "前端基础",
      items: [
        { title: "Javascript", link: "/javascript/event-loop" },
        { title: "JS Code", link: "/javascript/wapper-for-websocket-vue3" },
        { title: "Typescript", link: "/typescript/basic-object-and-function" },
        { title: "CSS", link: "/css/gradient-color" },
        { title: "类型编程", link: "/typescript/internal-tool-type" },
        { title: "HTTP", link: "/http/HTTP-request-and-response-header" },
      ],
    },
    {
      groupName: "框架",
      items: [
        { title: "Vue3", link: "/vue3/get-component-instance-in-setup" },
        { title: "React", link: "/react/avoid-mutation" },
        { title: "React Native", link: "/react-native/styleSheet" },
        { title: "NestJs", link: "/nest/nest-basic" },
        { title: "Nuxt", link: "/nuxt/nuxt-config" },
      ],
    },
    {
      groupName: "工具",
      items: [
        { title: "Git", link: "/git/01-git-pull-repository" },
        { title: "SQL", link: "/sql/my-sql-single-table-operation" },
        { title: "OSS", link: "/oss/get-sts" },
        { title: "Docker", link: "/docker/docker-basic" },
      ],
    },
    {
      groupName: "第三方库",
      items: [{ title: "mockJs", link: "/3-party-library/how-to-use-mockjs" }],
    },
    {
      groupName: "杂项",
      items: [
        { title: "Config", link: "/config/off-hibernate" },
        { title: "Error Fix", link: "/fix/nvm-president-problem-for-mac" },
      ],
    },
    {
      groupName: "杂谈",
      items: [
        { title: "Ordinary", link: "/ordinary/What-marriage-brings-to-me" },
      ],
    },
  ];

  return res;
}
