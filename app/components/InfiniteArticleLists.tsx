"use client";

import React, { useState, useEffect, useCallback } from "react";
import ArticleCard from "./ArticleCard";
import { getArticles } from "../actions/articles/get-articles";
import { Prisma, Article } from "@prisma/client";

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
        limit: 10,
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
  }, [whereCondition, nextCursor, hasMore, isLoading]);

  // スクロール監視
  useEffect(() => {
    const handleScroll = () => {
      // ページの下部に近づいたら読み込み開始
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;

      // 下から200px以内に来たら次のページを読み込み
      if (scrollHeight - scrollTop - clientHeight < 200) {
        loadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadMore]);

  return (
    <div className="w-full lg:w-4/5 px-4">
      <div className="flex justify-between mb-4">
        <h2 className="text-4xl font-bold">{title}</h2>
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

        {isLoading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">読み込み中...</p>
          </div>
        )}

        {/* これ以上記事がない場合 */}
        {!hasMore && articles.length > 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">すべての記事を表示しました</p>
          </div>
        )}

        {/* 手動読み込みボタン（オプション） */}
        {hasMore && !isLoading && (
          <div className="text-center py-8">
            <button
              onClick={loadMore}
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              さらに読み込む
            </button>
          </div>
        )}
      </div>
  );
}

export default InfiniteArticleLists;
