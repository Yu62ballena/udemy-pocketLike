"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function toggleArchive(formData: FormData) {

  try {
    // articleIdをformDataから取得
    const articleId = formData.get("articleId") as string;

    // articleIdから対象となるarticleのisArchivedカラムを取得する
    const article = await prisma.article.findUnique({
      where: {
        id: articleId,
      },
      select: {
        isArchived: true,
      },
    });

    if(!article) {
      throw new Error("記事が見つかりません");
    }

    // 取得したisArchivedを反転させる
    const reversedIsArchived = !article.isArchived;

    await prisma.article.update({
      where:{
        id: articleId,
      },
      data: {
        isArchived: reversedIsArchived,
      }
    })

    revalidatePath('/');

  } catch (err) {
    console.error(err);
  }
}
