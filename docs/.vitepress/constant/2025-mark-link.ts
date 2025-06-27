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
  JUN: [12, 27],
  MAY: [29],
};

export const markData: MarkData = {
  JUN: [
    {
      title: 'tailwind 中 @layer 的使用',
      link: '/css/tailwind-layer',
      tagName: TagName.CSS,
      createDate: '2025-06-27'
    },
    {
      title: "monorepo 构建",
      link: "/config/create-monorepo",
      tagName: TagName.Config,
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
