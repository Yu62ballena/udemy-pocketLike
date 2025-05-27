"use client";

import { useState } from "react";
import { extractUrlData, ArticleData } from "../actions/extract-url-data";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [articleData, setArticleData] = useState<ArticleData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    setError(null);
    setArticleData(null);

    try {
      const result = await extractUrlData(formData);
      setArticleData(result);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "不明なエラーが発生しました"
      );
    } finally {
      setLoading(false);
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
                disabled={loading}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 text-gray-900"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? "取得中..." : "情報を取得"}
            </button>
          </form>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {articleData && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
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

            <div className="p-6">
              <div className="mb-4">
                <span className="text-sm text-gray-500">
                  {articleData.siteName}
                </span>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {articleData.title}
              </h2>

              {articleData.description && (
                <p className="text-gray-600 mb-4">{articleData.description}</p>
              )}

              <div className="mb-4">
                <span className="text-sm text-gray-500">
                  更新日時:{" "}
                  {new Date(articleData.updatedAt).toLocaleString("ja-JP")}
                </span>
              </div>

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
