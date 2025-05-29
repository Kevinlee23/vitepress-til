import { type Link, TagName } from "./createTag";

export type Month =
  | "DEC"
  | "NOV"
  | "OCT"
  | "SEPT"
  | "AUG"
  | "JUL"
  | "JUN"
  | "MAY"
  | "APRI"
  | "MAR"
  | "FEB"
  | "JAN";

export type MarkDate = {
  [K in Month]?: number[];
};

export type MarkData = {
  [K in Month]?: Link[];
};

export const allMonthShort: Month[] = [
  "DEC",
  "NOV",
  "OCT",
  "SEPT",
  "AUG",
  "JUL",
  "JUN",
  "MAY",
  "APRI",
  "MAR",
  "FEB",
  "JAN",
];

export const showNum: number = 5;

export type TagNums = {
  [K in TagName]?: number;
};
