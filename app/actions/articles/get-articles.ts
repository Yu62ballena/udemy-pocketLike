"use server";

import { prisma } from "@/lib/prisma";
import { Article } from "@prisma/client";

export type GetArticlesResult = {
  data: Article[] | null;
  error: string | null;
  success: boolean;
  hasMore: boolean;
  nextCursor: string | null;
  totalCount?: number;
};

export type PaginationOptions = {
  limit?: number;
  cursor?: string;
  includeTotalCount?: boolean;
};

export async function getArticles(
  whereCondition: object,
  options: PaginationOptions = {}
): Promise<GetArticlesResult> {
  try {
    // optionsを分割代入
    const { limit = 10, cursor, includeTotalCount = false } = options;

    // カーソルの条件を追加

    const curosrCondition = cursor
      ? {
          id: {
            lt: cursor,
          },
        }
      : {};

    // メインクエリ
    const articles = await prisma.article.findMany({
      where: {
        ...whereCondition,
        ...curosrCondition,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: limit + 1,
    });

    // 次ページがあるかをチェック
    const hasMore = articles.length > limit;
    const displayArticles = hasMore ? articles.slice(0, -1) : articles;

    // 次のカーソル
    const nextCursor = hasMore
      ? displayArticles[displayArticles.length - 1]?.id
      : null;

    // 総数取得
    let totalCount;
    if (includeTotalCount) {
      totalCount = await prisma.article.count({
        where: whereCondition,
      });
    }

    return {
      data: displayArticles,
      error: null,
      success: true,
      hasMore,
      nextCursor,
      totalCount,
    };
  } catch (err) {
    // 詳細なエラーログ
    console.error("記事取得エラー:", {
      error: err,
      whereCondition,
      timestamp: new Date().toISOString(),
    });

    return {
      error: "記事の取得に失敗しました",
      success: false,
      data: null,
      hasMore: false,
      nextCursor: null,
      totalCount: undefined,
    };
  }
}
