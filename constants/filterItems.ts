import { ComponentType } from "react";
import { FaHeart, FaArchive, FaHome } from "react-icons/fa";
import { LuNewspaper } from "react-icons/lu";

export interface FilterItemsInterface {
  id: string;
  name: string;
  icon: ComponentType;
}

export const filterItems: FilterItemsInterface[] = [
  {
    id: "all",
    name: "すべて",
    icon: LuNewspaper,
  },
  {
    id: "home",
    name: "ホーム",
    icon: FaHome,
  },
  {
    id: "favorite",
    name: "お気に入り",
    icon: FaHeart,
  },
  {
    id: "archive",
    name: "アーカイブ",
    icon: FaArchive,
  },
];
