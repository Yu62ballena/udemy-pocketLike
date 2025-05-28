"use server";

import { prisma } from "@/lib/prisma";
import { Article } from "@prisma/client";

export type GetArticlesResult = {
  data: Article[] | null;
  error: string | null;
  success: boolean;
};

export async function getArticles(userId?: string): Promise<GetArticlesResult> {
  try {
    const articles = await prisma.article.findMany({
      where: {
        isArchived: false,
        ...(userId && { userId: userId }),
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      data: articles,
      error: null,
      success: true,
    };
  } catch (err) {
    // 詳細なエラーログ
    console.error("記事取得エラー:", {
      error: err,
      userId: userId,
      timestamp: new Date().toISOString(),
    });

    return {
      error: "記事の取得に失敗しました",
      success: false,
      data: null,
    };
  }
}
