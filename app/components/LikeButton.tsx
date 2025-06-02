import { FaRegHeart, FaHeart } from "react-icons/fa";
import { Article } from "@prisma/client";
import { toggleLike } from "../actions/articles/toggle-like";
import { useOptimistic, useTransition, useState, useEffect } from "react";
import { Instrument_Sans } from "next/font/google";

type ArticleListsProps = {
  articleData: Article;
};

function LikeButton({ articleData }: ArticleListsProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

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
    setError(null);

    startTransition(async () => {
      // 楽観的更新
      const newIsLiked = !optimisticArticle.isLiked;
      setOptimisticArticle(newIsLiked);

      try {
        // サーバーアクションの実行
        const formData = new FormData();
        formData.append("articleId", articleData.id);
        const result = await toggleLike(formData);

        if (!result.success) {
          throw new Error(result.error || "お気に入りの更新に失敗しました");
        }
      } catch (err) {
        console.error("お気に入り更新エラー", err);

        // 楽観的更新を元に戻す
        setOptimisticArticle(!newIsLiked);

        // エラーメッセージを表示
        const errorMessage = err instanceof Error
          ? err.message
          : "お気に入りの更新に失敗しました";
        setError(errorMessage);
      }
    });
  };

  // エラーの自動クリア
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="relative">
      <form action={handleToggleLike}>
        <input
          type="hidden"
          name="articleId"
          value={articleData.id}
        />
        <button
          type="submit"
          className={`cursor-pointer transition-colors ${
            optimisticArticle.isLiked ? "text-red-500" : "text-black"
          } ${isPending ? "opacity-50" : ""}`}
          disabled={isPending}
          title={
            optimisticArticle.isLiked ? "お気に入りを解除" : "お気に入りにする"
          }
        >
          {optimisticArticle.isLiked ? <FaHeart /> : <FaRegHeart />}
        </button>
      </form>

      {/* エラー表示 */}
      {error && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-red-100 border border-red-300 text-red-700 px-2 py-1 rounded text-xs whitespace-nowrap z-10">
          {error}
        </div>
      )}
    </div>
  );
}

export default LikeButton;
