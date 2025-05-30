import { ComponentType } from "react";
import { FaHeart, FaArchive } from "react-icons/fa";
import { LuNewspaper } from "react-icons/lu";

export interface FilterItemsInterface {
  id: string;
  name: string;
  listtype: string;
  icon: ComponentType;
  href: string;
}

export const filterItems: FilterItemsInterface[] = [
  {
    id: "all",
    name: "すべて",
    listtype: "all",
    icon: LuNewspaper,
    href: "/?listtype=all",
  },
  {
    id: "favorite",
    name: "お気に入り",
    listtype: "favorites",
    icon: FaHeart,
    href: "/?listtype=favorites",
  },
  {
    id: "archive",
    name: "アーカイブ",
    listtype: "archive",
    icon: FaArchive,
    href: "/?listtype=archive",
  },
];

// タイトルを取得する関数
export const getPageTitle = (listtype: string) => {
  const item = filterItems.find((item) => item.listtype === listtype);
  return item ? item.name : "記事一覧";
};

// 記事のフィルター条件を取得する関数
export const getWhereCondition = (listtype: string, userId: string) => {
  const baseWhere = { userId };

  switch (listtype) {
    case "all":
      return baseWhere;
    case "favorites":
      return { ...baseWhere, isLiked: true };
    case "archive":
      return { ...baseWhere, isArchived: true };
    default:
      return { ...baseWhere, isArchived: false };
  }
};
