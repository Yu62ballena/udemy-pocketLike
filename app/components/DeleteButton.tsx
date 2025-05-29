import { Article } from "@prisma/client";
import { deleteArticle } from "../actions/articles/delete-article";
import { FaRegTrashCan } from "react-icons/fa6";

type ArticleListsProps = {
  articleData: Article;
};

function DeleteButton({ articleData }: ArticleListsProps) {
  return (
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
  );
}

export default DeleteButton;
