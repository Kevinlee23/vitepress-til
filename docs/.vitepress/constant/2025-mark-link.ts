import { type Link, TagName } from "../utils/createTag";
import {
  type Month,
  type MarkDate,
  type MarkData,
  type TagNums,
  allMonthShort,
  showNum,
} from "../utils/mark-util";

export const markDate: MarkDate = {
  AUG: [22],
  JUL: [7, 8, 8, 18, 23],
  JUN: [12, 27],
  MAY: [29],
};

export const markData: MarkData = {
  AUG: [
    {
      title: "mongodb 数据迁移",
      link: "/mongodb/mongo-migrate",
      tagName: TagName.MongoDB,
      createDate: "2025-08-22",
    },
    {
      title: "获取 oss 图片时的压缩和优化",
      link: "/oss/compression",
      tagName: TagName.OSS,
      createDate: "2025-08-22",
    },
  ],
  JUL: [
    {
      title: "Nest 动态注入",
      link: "/nest/active-inject",
      tagName: TagName.NestJs,
      createDate: "2025-07-23",
    },
    {
      title: "前后端鉴权示例",
      link: "/nest/authentication-from-end-to-front",
      tagName: TagName.NestJs,
      createDate: "2025-07-18",
    },
    {
      title: "使用 mongoose 接入 mongodb",
      link: "/nest/mongoose-connect",
      tagName: TagName.NestJs,
      createDate: "2025-07-10",
    },
    {
      title: "常见的 Nest 通行证策略",
      link: "/nest/passport-strategy",
      tagName: TagName.NestJs,
      createDate: "2025-07-08",
    },
    {
      title: "Nest 通行证",
      link: "/nest/passport",
      tagName: TagName.NestJs,
      createDate: "2025-07-08",
    },
    {
      title: "迭代中正确使用对象键",
      link: "/typescript/how-to-iterate-over-object-keys",
      tagName: TagName.Typescript,
      createDate: "2025-07-07",
    },
  ],
  JUN: [
    {
      title: "tailwind 中 @layer 的使用",
      link: "/css/tailwind-layer",
      tagName: TagName.CSS,
      createDate: "2025-06-27",
    },
    {
      title: "monorepo 构建",
      link: "/ops/create-monorepo",
      tagName: TagName.OPs,
      createDate: "2025-06-12",
      tagStatus: "UPDATED",
    },
  ],
  MAY: [
    {
      title: "全属性 attr",
      link: "/css/all-property-attr",
      tagName: TagName.CSS,
      createDate: "2025-05-29",
    },
  ],
};

export const getNewNBlogs = (n: number = showNum): Link[] => {
  let res: number = n;
  let list: Link[] = [];

  allMonthShort.map((mon) => {
    let data: Link[] = markData[mon] || [];
    if (res !== 0) {
      if (data.length > res) {
        list.push(...data.slice(0, res));
        res = 0;
      } else {
        list.push(...data);
        res -= data.length;
      }
    }
  });

  return list;
};

export const getTagNums = (): TagNums => {
  const tagNums: TagNums = {};
  Object.keys(markData).map((key) => {
    markData[key as Month]?.map((blog) => {
      if (tagNums[blog.tagName]) {
        (tagNums[blog.tagName] as number)++;
      } else {
        tagNums[blog.tagName] = 1;
      }
    });
  });

  return tagNums;
};
