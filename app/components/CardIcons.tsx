import { FaRegHeart, FaArchive, FaHeart } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { CiCircleList } from "react-icons/ci";
import { Article } from "@prisma/client";
import { toggleLike } from "../actions/articles/toggle-like";
import { useOptimistic, useTransition } from "react";
import { deleteArticle } from "../actions/articles/delete-article";

type ArticleListsProps = {
  articleData: Article;
};

function CardIcons({ articleData }: ArticleListsProps) {
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
            optimisticArticle.isLiked ? "text-red-500" : "text-black"
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
              if (!confirm("この記事を削除しますか？")) e.preventDefault();
            }}
          >
            <FaRegTrashCan />
          </button>
        </form>
      )}
    </div>
  );
}

export default CardIcons;
