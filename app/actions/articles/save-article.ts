"use server";

import { prisma } from "@/lib/prisma";
import { ArticleData } from "../extract-url-data";
import { revalidatePath } from "next/cache";
import { checkUrlExists } from "./check-duplicate";

export async function saveArticle(articleData: ArticleData, userId: string) {
  try {
    // 重複チェック
    const isDuplicate = await checkUrlExists(articleData.url);
    if (isDuplicate) {
      return {
        error: "この記事はすでに登録されています",
        success: false,
      }
    }

    // 記事データをDBに保存
    const savedArticle = await prisma.article.create({
      data: {
        userId: userId,
        url: articleData.url,
        title: articleData.title,
        siteName: articleData.siteName,
        description: articleData.description,
        thumbnail: articleData.thumbnail,
        content: articleData.content,
        publishedAt: new Date(articleData.publishedAt), 
      },
    });

    // DBに保存した段階で画面を更新
    revalidatePath("/");

    return {
      error: undefined,
      success: true,

      // 保存した記事のデータも一緒にリターン
      data: savedArticle,
    };
  } catch (err) {
    // 詳細なエラーログ
    console.error("記事保存エラー:", {
      error: err,
      url: articleData.url,
      userId: userId,
      timestamp: new Date().toISOString(),
    });

    // ユーザー向けエラーメッセージ
    let errorMessage = "記事の保存に失敗しました";

    if (err instanceof Error) {
      // 特定のエラーに応じてメッセージを調整
      if (err.message.includes("Unique constraint")) {
        errorMessage = "この記事は既に保存されています";
      } else if (err.message.includes("Foreign key constraint")) {
        errorMessage = "ユーザー情報が見つかりません";
      }
    }

    return {
      error: errorMessage,
      success: false,
    };
  }
}
