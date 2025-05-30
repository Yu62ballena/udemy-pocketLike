import { FilterItemsInterface } from "@/constants/filterItems";

import Link from "next/link";
type SidebarItemProps = {
  content: FilterItemsInterface;
};

function SidebarItem({ content }: SidebarItemProps) {
  const IconComponent = content.icon;

  return (
    <li>
      <Link href={content.href} className="flex items-center gap-2">
        <IconComponent/>
        {content.name}
      </Link>
    </li>
  );
}

export default SidebarItem;
