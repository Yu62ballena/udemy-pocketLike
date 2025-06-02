import { Article } from "@prisma/client";
import { deleteArticle } from "../actions/articles/delete-article";
import { FaRegTrashCan } from "react-icons/fa6";
import { useState, useTransition, useEffect } from "react";

type ArticleListsProps = {
  articleData: Article;
};

function DeleteButton({ articleData }: ArticleListsProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleDeleteArticle = () => {
    setError(null);

    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("articleId", articleData.id);
        const result = await deleteArticle(formData);

        if (!result.success) {
          throw new Error(result.error || "記事の削除に失敗しました");
        }
      } catch (err) {
        console.error(err);

        const errorMessage =
          err instanceof Error ? err.message : "記事の削除に失敗しました";

        setError(errorMessage);
      }
    });
  };

  // エラーのクリア
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
      <form action={handleDeleteArticle}>
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
          disabled={isPending}
        >
          <FaRegTrashCan />
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

export default DeleteButton;
