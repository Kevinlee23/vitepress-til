import md5 from "blueimp-md5";
import { MY_TAB, type IItems, createSidebar } from "./createSideBar";

export interface IShortUrlMap {
  [key: string]: string;
}

export function createShortUrlMap(): [IShortUrlMap, IShortUrlMap] {
  const allSideBar = createSidebar();
  const tabs = Object.keys(allSideBar) as MY_TAB[];
  const long2short: IShortUrlMap = {};
  const short2long: IShortUrlMap = {};
  function findItems(items?: IItems[]) {
		if(!items) return "";

    for (const item of items) {
      if (item["items"]) {
        findItems(item["items"]);
      } else {
        const link = item.link;
        if (link) {
          const shortUrl = md5(link).slice(0, 11);
          long2short[link] = shortUrl;
          short2long[shortUrl] = link;
        }
      }
    }
  }

  tabs.forEach((tab) => {
    findItems(allSideBar[tab]);
  });

  return [long2short, short2long];
}

export const [long2short, short2long] = createShortUrlMap();
