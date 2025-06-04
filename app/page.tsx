import InfiniteArticleLists from "./components/InfiniteArticleLists";
import { getPageTitle, getWhereCondition } from "@/constants/filterItems";
import { Prisma } from "@prisma/client";
import { getArticles } from "./actions/articles/get-articles";
import { getCurrentUser } from "@/lib/auth-helpers";
import MobileLayout from "./components/MobileLayout";

interface HomeProps {
  searchParams: Promise<{
    listtype?: string;
    q?: string;
  }>;
}

export default async function Home(props: HomeProps) {
  // 認証
  const user = await getCurrentUser();

  const resolvedSearchParams = await props.searchParams;
  const listtype = resolvedSearchParams.listtype || "default";
  const searchQuery = resolvedSearchParams.q;

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
        <MobileLayout>
          <p className="text-red-500">
            {initialData.error || "記事の取得に失敗しました"}
          </p>
        </MobileLayout>
      </div>
    );
  }

  return (
    <MobileLayout>
      <InfiniteArticleLists
        title={title}
        whereCondition={whereCondition}
        initialArticles={initialData.data}
        initialNextCursor={initialData.nextCursor}
        initialHasMore={initialData.hasMore}
      />
    </MobileLayout>
  );
}
