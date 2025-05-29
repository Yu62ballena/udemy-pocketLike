import { Article } from "@prisma/client";
import { FaArchive } from "react-icons/fa";
import { toggleArchive } from "../actions/articles/toggle-archive";
import { useTransition } from "react";

type ArticleListsProps = {
  articleData: Article;
};

function ArchiveButton({ articleData }: ArticleListsProps) {
  const [isPending, startTransition] = useTransition();

  const handleToggleArchive = () => {
    startTransition(async () => {
      const formData = new FormData();
      formData.append("articleId", articleData.id);
      await toggleArchive(formData);
    });
  };

  return (
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
        title={articleData.isArchived ? "アーカイブを解除" : "アーカイブに移動"}
      >
        <FaArchive />
      </button>
    </form>
  );
}

export default ArchiveButton;
