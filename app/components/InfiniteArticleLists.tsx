"use client";

import ArticleCard from "./ArticleCard";
import { Prisma, Article } from "@prisma/client";
import LoadingIndicator from "./LoadingIndicator";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { useArticleLoader } from "@/hooks/useArticleLoader";

type InfiniteArticleListsProps = {
  title: string;
  whereCondition: Prisma.ArticleWhereInput;
  initialArticles: Article[];
  initialNextCursor: string | null;
  initialHasMore: boolean;
};

function InfiniteArticleLists({
  title,
  whereCondition,
  initialArticles,
  initialNextCursor,
  initialHasMore,
}: InfiniteArticleListsProps) {

  // ページを読み込む
  const { articles, hasMore, isLoading, loadMore } = useArticleLoader({
    whereCondition,
    initialArticles,
    initialNextCursor,
    initialHasMore,
  });

  // スクロール監視
  useInfiniteScroll({
    loadMore,
    hasMore,
    isLoading,
  });

  return (
    <div className="w-full lg:w-4/5 px-4">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">{title}</h2>
      </div>
      <hr />

      {/* 記事一覧 */}
      <div className="p-4 flex flex-col gap-4">
        {articles.map((article) => (
          <ArticleCard
            key={article.id}
            articleData={article}
          />
        ))}
      </div>

      {/* ローディング表示 */}
      <LoadingIndicator
        isLoading={isLoading}
        hasMore={hasMore}
        articlesLength={articles.length}
        loadMore={loadMore}
      />
    </div>
  );
}

export default InfiniteArticleLists;
