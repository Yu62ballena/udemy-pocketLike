import { Article, Prisma } from "@prisma/client";
import { useEffect, useState, useCallback } from "react";
import { getArticles } from "@/app/actions/articles/get-articles";

interface UseArticleLoaderProps {
  whereCondition: Prisma.ArticleWhereInput;
  initialArticles: Article[];
  initialNextCursor: string | null;
  initialHasMore: boolean;
  limit?: number;
}

export function useArticleLoader({
  whereCondition,
  initialArticles,
  initialHasMore,
  initialNextCursor,
  limit = 10,
}: UseArticleLoaderProps) {
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [nextCursor, setNextCursor] = useState<string | null>(
    initialNextCursor
  );
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [isLoading, setIsLoading] = useState(false);

  // 初期データが変更されたときにstateをリセット
  useEffect(() => {
    setArticles(initialArticles);
    setNextCursor(initialNextCursor);
    setHasMore(initialHasMore);
  }, [initialArticles, initialHasMore, initialNextCursor]);

  // 次のページを読み込む関数
  const loadMore = useCallback(async () => {
    if (!hasMore || isLoading || !nextCursor) return;

    setIsLoading(true);

    try {
      const result = await getArticles(whereCondition, {
        cursor: nextCursor,
        limit: limit,
      });

      if (result.success && result.data) {
        // 既存の記事に新しい記事を追加
        setArticles((prev) => [...prev, ...result.data!]);
        setNextCursor(result.nextCursor);
        setHasMore(result.hasMore);
      }
    } catch (error) {
      console.error("記事読み込みエラー:", error);
    } finally {
      setIsLoading(false);
    }
  }, [whereCondition, nextCursor, hasMore, isLoading, limit]);

  return {
    articles,
    hasMore,
    isLoading,
    loadMore,
  };
}
