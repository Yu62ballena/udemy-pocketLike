import React from "react";
import ArticleCard from "./ArticleCard";
import { ArticleData } from "../actions/extract-url-data";

type ArticleListsProps = {
  articlesData: ArticleData[];
};

function ArticleLists({ articlesData }: ArticleListsProps) {
  return (
    <div className="w-4/5 px-4">
      <h2 className="text-4xl font-bold">記事一覧</h2>
      <hr />
      <div className="p-4 flex flex-col gap-4">
        {articlesData.map((article) => (
          <ArticleCard
            key={article.title}
            articleData={article}
          />
        ))}
      </div>
    </div>
  );
}

export default ArticleLists;
