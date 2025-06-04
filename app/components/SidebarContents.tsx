import SidebarItem from "./SidebarItem";
import { FilterItemsInterface } from "@/constants/filterItems";
import React, { Dispatch, SetStateAction } from "react";

type SidebarContentsProps = {
  title: string;
  contents: FilterItemsInterface[];
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
};

function SidebarContents({
  title,
  contents,
  setIsSidebarOpen,
}: SidebarContentsProps) {
  return (
    <div className="pl-4 pt-4 lg:p-0">
      <h2 className="text-3xl lg:text-2xl font-bold mb-8">{title}</h2>
      <ul className="flex flex-col gap-6 pl-4">
        {contents.map((content) => (
          <SidebarItem
            key={content.id}
            content={content}
            setIsSidebarOpen={setIsSidebarOpen}
          />
        ))}
      </ul>
    </div>
  );
}

export default SidebarContents;
