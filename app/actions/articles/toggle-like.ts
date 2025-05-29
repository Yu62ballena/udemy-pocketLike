"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function toggleLike(formData: FormData) {
  try {
    // articleIdをformDataから取得
    const articleId = formData.get("articleId") as string;

    // articleIdから対象となるarticleのisLikedカラムを取得する
    const article = await prisma.article.findUnique({
      where: {
        id: articleId,
      },
      select: {
        isLiked: true,
      },
    });

    if(!article) {
      throw new Error("記事が見つかりません");
    }

    // 取得したisLikedを反転させる
    const reversedIsLiked = !article.isLiked;

    await prisma.article.update({
      where:{
        id: articleId,
      },
      data: {
        isLiked: reversedIsLiked,
      }
    })

    revalidatePath('/');

  } catch (err) {
    console.error(err);
  }
}
