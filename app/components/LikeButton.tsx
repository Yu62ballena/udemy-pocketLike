import { FaRegHeart, FaHeart } from "react-icons/fa";
import { Article } from "@prisma/client";
import { toggleLike } from "../actions/articles/toggle-like";
import { useOptimistic, useTransition } from "react";

type ArticleListsProps = {
  articleData: Article;
};

function LikeButton({ articleData }: ArticleListsProps) {
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
        title={optimisticArticle.isLiked ? "お気に入りを解除" : "お気に入りにする"}
      >
        {optimisticArticle.isLiked ? <FaHeart /> : <FaRegHeart />}
      </button>
    </form>
  );
}

export default LikeButton;
