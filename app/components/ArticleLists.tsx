import React from "react";
import ArticleCard from "./ArticleCard";
import { getArticles } from "../actions/articles/get-articles";

async function ArticleLists() {
  // 一時的なユーザーIDを定義
  // あとでログイン中のユーザーのユーザーIDを取得するコードに差し替える
  const UserId = "temp-user-123";

  const articles = await getArticles(UserId);

  // エラーハンドリング
  if (!articles.success || !articles.data) {
    return (
      <div className="w-4/5 px-4">
        <h2 className="text-4xl font-bold">記事一覧</h2>
        <hr />
        <div className="p-4">
          <p className="text-red-500">
            {articles.error || "記事の取得に失敗しました"}
          </p>
        </div>
      </div>
    );
  }

  // データが空の場合
  if (articles.data.length === 0) {
    return (
      <div className="w-4/5 px-4">
        <h2 className="text-4xl font-bold">記事一覧</h2>
        <hr />
        <div className="p-4">
          <p className="text-gray-500">保存された記事がありません</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-4/5 px-4">
      <div className="flex justify-between mb-4">
        <h2 className="text-4xl font-bold">記事一覧</h2>
        <div>
          <span>↑</span>
          <span>↓</span>
        </div>
      </div>
      <hr />
      <div className="p-4 flex flex-col gap-4">
        {articles.data.map((article) => (
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
