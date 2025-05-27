"use client";

import { useState } from "react";
import { extractUrlData, ArticleData } from "../actions/extract-url-data";

export default function Home() {
  // URLから取得したサイトデータ・メタデータを格納するstate
  const [articleData, setArticleData] = useState<ArticleData | null>(null);

  // エラーがあった場合、内容を格納するstate
  const [error, setError] = useState<string | null>(null);

  // formDataに入力したURLがわたってくる
  const handleSubmit = async (formData: FormData) => {
    setError(null);
    setArticleData(null);

    try {
      // extractUrlDataにformDataのURLを渡す
      // サイトデータ・メタデータを取得してresultに格納
      const result = await extractUrlData(formData);
      // 取得したデータをstate（articleData）に保存
      setArticleData(result);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "不明なエラーが発生しました"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Pocket Clone - URL情報取得テスト
        </h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <form
            // handleSubmitを呼び出してURLのサイトデータを取得する
            action={handleSubmit}
            className="space-y-4"
          >
            <div>
              <label
                htmlFor="url"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                URL
              </label>
              <input
                type="url"
                id="url"
                name="url"
                placeholder="https://example.com/article"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 text-gray-900"
              />
            </div>
            <button
              // handleSubmitを発動
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            ></button>
          </form>
        </div>

        {/* エラーがある場合、ここに表示 */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {articleData && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* サムネデータを表示 */}
            {articleData.thumbnail && (
              <div className="aspect-video bg-gray-200">
                <img
                  src={articleData.thumbnail}
                  alt={articleData.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
            )}

            {/* サイトの名前を表示 */}
            <div className="p-6">
              <div className="mb-4">
                <span className="text-sm text-gray-500">
                  {articleData.siteName}
                </span>
              </div>

              {/* 記事タイトルを表示 */}
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {articleData.title}
              </h2>

              {/* メタのdescriptionデータがあれば表示 */}
              {/* 実際はdescriptionがなければ記事本文の抜粋を表示するようにしたい */}
              {/* 下の方にある記事抜粋と組み合わせて利用 */}
              {articleData.description && (
                <p className="text-gray-600 mb-4">{articleData.description}</p>
              )}

              {/* 記事の公開日時（正確に言うと更新日時を取得している） */}
              <div className="mb-4">
                <span className="text-sm text-gray-500">
                  更新日時:{" "}
                  {new Date(articleData.updatedAt).toLocaleString("ja-JP")}
                </span>
              </div>

              {/* サイトURLを表示 */}
              <div className="mb-6">
                <a
                  href={articleData.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline break-all"
                >
                  {articleData.url}
                </a>
              </div>

              {/* 記事の抜粋を表示 */}
              {articleData.content && (
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    記事内容（抜粋）
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="text-gray-700 whitespace-pre-line">
                      {articleData.content}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
