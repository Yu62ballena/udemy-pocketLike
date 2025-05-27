"use client";

import { useState } from "react";
import ArticleLists from "./components/ArticleLists";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { ArticleData } from "./actions/extract-url-data";

export default function Home() {
  const [articlesData, setArticlesData] = useState<ArticleData[]>([]);

  // 新しい記事を追加する関数
  const addArticleData = (newArticle: ArticleData) => {
    setArticlesData((prevArticles) => [newArticle, ...prevArticles]);
  };

  return (
    <div className="w-11/12 mx-auto">
      <Header addArticleData={addArticleData} />

      <div className="flex justify-between gap-10">
        <Sidebar />
        <ArticleLists articlesData={articlesData} />
      </div>
    </div>
  );
}
