import InfiniteArticleLists from "./components/InfiniteArticleLists";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { getPageTitle, getWhereCondition } from "@/constants/filterItems";
import { Prisma } from "@prisma/client";
import { getArticles } from "./actions/articles/get-articles";
import { getCurrentUser } from "@/lib/auth-helpers";
// import ArticleLists from "./components/ArticleLists";

interface HomeProps {
  searchParams: Promise<{
    listtype?: string;
    q?: string;
  }>;
}

export default async function Home(props: HomeProps) {
  // 認証
  const user = await getCurrentUser();
  console.log("user", user);

  const resolvedSearchParams = await props.searchParams;
  const listtype = resolvedSearchParams.listtype || "default";
  const searchQuery = resolvedSearchParams.q;

  // const userId = "temp-user-123";
  const userId = user.id;

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

  // 最初のページを取得
  const initialData = await getArticles(whereCondition, {
    limit: 10,
    includeTotalCount: true,
  });

  // initialDataが取得出来なかった場合の処理
  if (!initialData.success || !initialData.data) {
    return (
      <div className="w-11/12 mx-auto">
        <Header />
        <div className="flex justify-between gap-10">
          <Sidebar />
          <div className="w-4/5 px-4">
            <h2 className="text-4xl font-bold">{title}</h2>
            <hr />
            <div className="p-4">
              <p className="text-red-500">
                {initialData.error || "記事の取得に失敗しました"}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-11/12 mx-auto">
      <Header />

      <div className="flex justify-between gap-10">
        <Sidebar />
        <InfiniteArticleLists
          title={title}
          whereCondition={whereCondition}
          initialArticles={initialData.data}
          initialNextCursor={initialData.nextCursor}
          initialHasMore={initialData.hasMore}
        />
      </div>
    </div>
  );
}
