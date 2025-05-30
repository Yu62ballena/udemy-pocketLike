import ArticleLists from "./components/ArticleLists";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { getPageTitle, getWhereCondition } from "@/constants/filterItems";

interface HomeProps {
  searchParams: {
    listtype?: string;
  };
}

export default async function Home({ searchParams }: HomeProps) {
  const resolvedSearchParams = await searchParams;
  const listtype = resolvedSearchParams.listtype || "default";
  const userId = "temp-user-123";

  const title = getPageTitle(listtype);
  
    // 一時的なユーザーIDを定義
  const whereCondition = getWhereCondition(listtype, userId);

  return (
    <div className="w-11/12 mx-auto">
      <Header />

      <div className="flex justify-between gap-10">
        <Sidebar />
        <ArticleLists title={title} whereCondition={whereCondition} />
      </div>
    </div>
  );
}
