import { CiCircleList } from "react-icons/ci";
import { Article } from "@prisma/client";

type ArticleListsProps = {
  articleData: Article;
};

function CategoryButton({ articleData }: ArticleListsProps) {

console.log(articleData);

  const handleCategory = () => {
    console.log("handleCategoryに入りました");
  };

  return (
    <form action={handleCategory}>
      <input
        type="hidden"
        // name="articleId"
        // value={articleData.id}
      />
      <button
        type="submit"
        // disabled={isPending}
        // className={`cursor-pointer transition-colors ${
        //   articleData.isArchived ? "text-red-500" : "text-gray-600"
        // } ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
        // title={articleData.isArchived ? "アーカイブを解除" : "アーカイブに移動"}
      >
        <CiCircleList />
      </button>
    </form>
  );
}

export default CategoryButton;
