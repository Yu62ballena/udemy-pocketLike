import { Article } from "@prisma/client";
import { FaArchive } from "react-icons/fa";
import { toggleArchive } from "../actions/articles/toggle-archive";
import { useTransition, useState, useEffect } from "react";

type ArticleListsProps = {
  articleData: Article;
};

function ArchiveButton({ articleData }: ArticleListsProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleToggleArchive = () => {
    setError(null);

    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("articleId", articleData.id);
        const result = await toggleArchive(formData);

        if (!result.success) {
          throw new Error(result.error || "アーカイブの登録に失敗しました");
        }
      } catch (err) {
        console.error("アーカイブ登録エラー", err);

        const errorMessage =
          err instanceof Error ? err.message : "アーカイブの登録に失敗しました";

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
      <form action={handleToggleArchive}>
        <input
          type="hidden"
          name="articleId"
          value={articleData.id}
        />
        <button
          type="submit"
          disabled={isPending}
          className={`cursor-pointer transition-colors ${
            articleData.isArchived ? "text-red-500" : "text-gray-600"
          } ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
          title={
            articleData.isArchived ? "アーカイブを解除" : "アーカイブに移動"
          }
        >
          <FaArchive />
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

export default ArchiveButton;
