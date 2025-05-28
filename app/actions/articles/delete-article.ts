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

    console.log("記事が削除されました", deletedArticle.title);

    revalidatePath("/");
  } catch (err) {
    console.error("記事削除エラー:", err);

    // エラーの種類に応じてメッセージを調整
    if (err instanceof Error) {
      if (err.message.includes("Record to delete does not exist")) {
        console.error("削除しようとした記事が見つかりません");
      } else {
        console.error("記事の削除に失敗しました:", err.message);
      }
    }
  }
}
