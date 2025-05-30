import ArticleLists from "./components/ArticleLists";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { getPageTitle, getWhereCondition } from "@/constants/filterItems";
import { Prisma } from "@prisma/client";

interface HomeProps {
  searchParams: Promise<{
    listtype?: string;
    q?: string;
  }>;
}

export default async function Home(props: HomeProps) {
  const resolvedSearchParams = await props.searchParams;
  const listtype = resolvedSearchParams.listtype || "default";
  const searchQuery = resolvedSearchParams.q;

  console.log("searchQuery:", searchQuery);
  console.log("resolvedSearchParams:", resolvedSearchParams);

  const userId = "temp-user-123";

  let title: string;
  let whereCondition: Prisma.ArticleWhereInput;

  if (searchQuery) {
    console.log("検索モードに入りました"); // デバッグ用
    title = `検索結果："${searchQuery}"`;
    whereCondition = {
      userId: userId,
      isArchived: false,
      OR: [
        { title: { contains: searchQuery } },
        { siteName: { contains: searchQuery } },
        { description: { contains: searchQuery } },
        { content: { contains: searchQuery } },
      ],
    };
  } else {
    console.log("通常モード");
    title = getPageTitle(listtype);
    whereCondition = getWhereCondition(listtype, userId);
  }

  return (
    <div className="w-11/12 mx-auto">
      <Header />

      <div className="flex justify-between gap-10">
        <Sidebar />
        <ArticleLists
          title={title}
          whereCondition={whereCondition}
        />
      </div>
    </div>
  );
}
