"use client";

import Image from "next/image";

import { FaRegHeart, FaArchive, FaHeart } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { CiCircleList } from "react-icons/ci";
import { Article } from "@prisma/client";
import { deleteArticle } from "../actions/articles/delete-article";
import { toggleLike } from "../actions/articles/toggle-like";
import { useOptimistic, useTransition } from "react";

type ArticleListsProps = {
  articleData: Article;
};

function ArticleCard({ articleData }: ArticleListsProps) {
  const [isPending, startTransition] = useTransition();

  // 楽観的更新用のstate
  const [optimisticArticle, setOptimisticArticle] = useOptimistic(
    articleData,
    (currentArticle, newIsLiked: boolean) => ({
      ...currentArticle,
      isLiked: newIsLiked,
    })
  );

  // お気に入り切り替え関数
  const handleToggleLike = () => {
    startTransition(async () => {
      // 楽観的更新
      const newIsLiked = !optimisticArticle.isLiked;
      setOptimisticArticle(newIsLiked);

      // サーバーアクションの実行
      const formData = new FormData();
      formData.append("articleId", articleData.id);
      await toggleLike(formData);
    });
  };

  return (
    <>
      {articleData && (
        <div className="border flex justify-between gap-8 p-4">
          {/* 左側 */}
          <div className="w-3/4 flex flex-col">
            {/* タイトル部分 */}
            <div className="mb-4">
              <h3 className="font-bold text-2xl mb-1">{articleData.title}</h3>
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
              <span>
                {articleData.publishedAt
                  ? new Date(articleData.publishedAt).toLocaleDateString(
                      "ja-JP",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )
                  : "公開日時データなし"}
              </span>
              <div className="flex justify-between gap-3 items-center">
                {/* お気に入りボタン */}
                <form action={handleToggleLike}>
                  <input
                    type="hidden"
                    name="articleId"
                    disabled={isPending}
                    value={articleData.id}
                  />
                  <button
                    type="submit"
                    className={`cursor-pointer transition-colors ${
                      articleData.isLiked ? "text-red-500" : "text-black"
                    }`}
                  >
                    {optimisticArticle.isLiked ? <FaHeart /> : <FaRegHeart />}
                  </button>
                </form>

                {/* カテゴリ */}
                <CiCircleList />

                {/* アーカイブボタン */}
                <FaArchive />

                {/* デリートボタン */}
                {articleData.isArchived === true && (
                  <form action={deleteArticle}>
                    <input
                      type="hidden"
                      name="articleId"
                      value={articleData.id}
                    />
                    <button
                      type="submit"
                      className="cursor-pointer hover:text-red-500 transition-colors"
                      aria-label="記事を削除"
                      onClick={(e) => {
                        if (!confirm("この記事を削除しますか？"))
                          e.preventDefault();
                      }}
                    >
                      <FaRegTrashCan />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* 右側 */}
          <div className="w-1/4">
            <div className="relative w-full h-40">
              {articleData.thumbnail ? (
                <Image
                  className="object-cover object-center"
                  src={articleData.thumbnail}
                  alt={articleData.title}
                  fill={true}
                  priority
                  onError={(e) => {
                    // 画像が読み込めない場合の処理
                    e.currentTarget.style.display = "none";
                  }}
                />
              ) : (
                <div className="w-full h-40 bg-gray-200 rounded flex items-center justify-center">
                  <span className="text-gray-400">画像なし</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ArticleCard;
