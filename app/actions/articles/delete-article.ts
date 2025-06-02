"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteArticle(formData: FormData) {
  try {
    const articleId = formData.get("articleId") as string;

    const deletedArticle = await prisma.article.delete({
      where: {
        id: articleId,
      },
    });

    if (!deletedArticle) {
      throw new Error("記事が見つかりません");
    }

    revalidatePath("/");

    return { success: true };
  } catch (err) {
    console.error("記事削除エラー:", err);

    // エラーの種類に応じてメッセージを調整
    if (err instanceof Error) {
      if (err.message.includes("Record to delete does not exist")) {
        return {
          success: false,
          error: "削除しようとした記事が見つかりません。",
        };
      } else {
        return {
          success: false,
          error: "記事を削除できませんでした",
        };
      }
    }

    return { success: false, error: "不明なエラーが発生しました" };
  }
}
