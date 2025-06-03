import React from "react";
import SidebarContents from "./SidebarContents";
import { filterItems } from "@/constants/filterItems";
import SidebarUserInfo from "./SidebarUserInfo";

type SidebarProps = {
  isSidebarOpen: boolean;
};

function Sidebar({ isSidebarOpen }: SidebarProps) {

  return (
    <section
      className={`fixed lg:sticky top-16 lg:top-24 h-[calc(100vh-4rem)] lg:h-[calc(100vh-6rem)] z-50 left-0 bg-white w-4/5 md:w-2/5 lg:w-1/5 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full translate3d(0,0,0)"
      } transform transition-transform will-change-transform duration-200 ease-out lg:translate-x-0 flex flex-col`}
    >
      <SidebarContents
        title="フィルター"
        contents={filterItems}
      />

      <SidebarUserInfo />
    </section>
  );
}

export default Sidebar;
