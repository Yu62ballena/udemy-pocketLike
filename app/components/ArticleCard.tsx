"use client";

import CardIcons from "./CardIcons";
import CardImage from "./CardImage";
import CardDate from "./CardDate";
import { Article } from "@prisma/client";

type ArticleListsProps = {
  articleData: Article;
};

function ArticleCard({ articleData }: ArticleListsProps) {
  return (
    <>
      {articleData && (
        <div className="border flex justify-between gap-8 p-4">
          {/* 左側 */}
          <div className="w-3/4 flex flex-col">
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

            {/* 日時・アイコン */}
            <div className="flex justify-between mt-auto">
              <CardDate articleData={articleData} />

              {/* アイコン */}
              <CardIcons articleData={articleData} />
            </div>
          </div>

          {/* 右側 （サムネ）*/}
          <div className="w-1/4">
            <CardImage articleData={articleData} />
          </div>
        </div>
      )}
    </>
  );
}

export default ArticleCard;
