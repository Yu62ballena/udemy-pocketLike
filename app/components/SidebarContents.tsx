import React from "react";
import SidebarItem from "./SidebarItem";
import { FilterItemsInterface } from "@/constants/filterItems";

type SidebarContentsProps = {
  title: string;
  contents: FilterItemsInterface[];
};

function SidebarContents({ title, contents }: SidebarContentsProps) {
  return (
    <div className="pl-4 pt-4 lg:p-0">
      <h2 className="text-3xl lg:text-2xl font-bold mb-8">{title}</h2>
      <ul className="flex flex-col gap-8 pl-4">
        {contents.map((content) => (
          <SidebarItem
            key={content.id}
            content={content}
          />
        ))}
      </ul>
    </div>
  );
}

export default SidebarContents;
