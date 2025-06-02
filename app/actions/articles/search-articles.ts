"use server";

import { getCurrentUserId } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import { Article } from "@prisma/client";

type SearchArticlesResult = {
  data: Article[] | null;
  error: string | null;
  success: boolean;
};

export async function searchArticles(
  formData: FormData
): Promise<SearchArticlesResult> {
  try {
    const query = formData.get("query") as string;

    if (!query || query.trim() === "") {
      return {
        error: "検索キーワードを入力してください",
        success: false,
        data: null,
      };
    }

    // 一時的なuserId
    // const userId = "temp-user-123";
    const userId = await getCurrentUserId();

    const articles = await prisma.article.findMany({
      where: {
        userId,
        isArchived: false, // アーカイブされていない記事のみを検索対象にしている
        OR: [
          { title: { contains: query } },
          { siteName: { contains: query } },
          { description: { contains: query } },
          { content: { contains: query } },
        ],
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
    console.error("検索エラー:", {
      error: err,
      timestamp: new Date().toISOString(),
    });

    return {
      error: "検索に失敗しました",
      success: false,
      data: null,
    };
  }
}
