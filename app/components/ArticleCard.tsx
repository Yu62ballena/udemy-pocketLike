"use client";

import CardIcons from "./CardIcons";
import CardImage from "./CardImage";
import CardDate from "./CardDate";
import { Article } from "@prisma/client";
import Link from "next/link";

type ArticleListsProps = {
  articleData: Article;
};

function ArticleCard({ articleData }: ArticleListsProps) {
  return (
    <>
      {articleData && (
        <div className="border group hover:bg-gray-50 transition-colors px-4 pt-4 pb-3 relative">
          <Link
            href={articleData.url}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 z-0"
            aria-label={`${articleData.title}を開く`}
          />
          <div className="flex justify-between flex-col-reverse md:flex-row gap-8">
            {/* 左側 */}
            <div className="w-full md:w-3/4 flex flex-col">
              {/* タイトル部分 */}
              <div className="mb-4">
                <h3 className="font-bold text-xl mb-1">{articleData.title}</h3>
                <span className="text-gray-400 text-sm">
                  {articleData.siteName}
                </span>
              </div>

              {/* description / 記事抜粋 */}
              <div className="mb-4">
                <p>{articleData.description}</p>
              </div>
            </div>

            {/* 右側 （サムネ）*/}
            <div className="w-full md:w-1/4 pointer-events-none">
              <CardImage articleData={articleData} />
            </div>
          </div>

          {/* 日時・アイコン */}
          <div className="flex flex-col md:flex-row justify-between mt-auto items-end">
            <CardDate articleData={articleData} />

            {/* アイコン */}
            <div className="relative z-20 mt-2 md:mt-6">
              <CardIcons articleData={articleData} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ArticleCard;
