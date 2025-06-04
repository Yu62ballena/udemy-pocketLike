import { FilterItemsInterface } from "@/constants/filterItems";
import React, { Dispatch, SetStateAction } from "react";

import Link from "next/link";
type SidebarItemProps = {
  content: FilterItemsInterface;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
};

function SidebarItem({ content, setIsSidebarOpen }: SidebarItemProps) {
  const IconComponent = content.icon;

  return (
    <li>
      <Link
        onClick={() => setIsSidebarOpen(false)}
        href={content.href}
        className="flex items-center gap-3 text-xl"
      >
        <IconComponent />
        {content.name}
      </Link>
    </li>
  );
}

export default SidebarItem;
