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

  const userId = "temp-user-123";

  let title: string = "記事一覧";
  let whereCondition: Prisma.ArticleWhereInput = { userId };

  if (searchQuery) {
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
