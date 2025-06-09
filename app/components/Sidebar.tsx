import React, { Dispatch, SetStateAction } from "react";
import SidebarContents from "./SidebarContents";
import { filterItems } from "@/constants/filterItems";
import SidebarUserInfo from "./SidebarUserInfo";

type SidebarProps = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
};

function Sidebar({ isSidebarOpen, setIsSidebarOpen }: SidebarProps) {
  return (
    <section
      className={`fixed lg:sticky top-16 lg:top-24 h-[calc(100vh-4rem)] lg:h-[calc(100vh-6rem)] z-50 left-0 bg-white w-4/5 md:w-2/5 lg:w-1/5 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full translate3d(0,0,0)"
      } transform transition-transform will-change-transform duration-200 ease-out lg:translate-x-0 flex flex-col`}
    >
      {/* メインコンテンツエリア（スクロール対象） */}
      <div className="flex-1 overflow-y-auto min-h-0">
        <SidebarContents
          title="フィルター"
          contents={filterItems}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </div>

      {/* ユーザー情報エリア（固定） */}
      <div className="flex-shrink-0 min-h-fit">
        <SidebarUserInfo />
      </div>
    </section>
  );
}

export default Sidebar;
