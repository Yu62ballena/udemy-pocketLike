'use server';

import { prisma } from "@/lib/prisma";

export async function checkUrlExists(url: string) {
  const existingArticle = await prisma.article.findUnique({
    where: {
      url: url,
    },
  });

  return !!existingArticle;
}
