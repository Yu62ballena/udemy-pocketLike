import React from "react";
import SidebarItem from "./SidebarItem";
import { FilterItemsInterface } from "@/constants/filterItems";

type SidebarContentsProps = {
  title: string;
  contents: FilterItemsInterface[];
};

function SidebarContents({ title, contents }: SidebarContentsProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
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
