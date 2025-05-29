import { FaArchive } from "react-icons/fa";
import { CiCircleList } from "react-icons/ci";
import { Article } from "@prisma/client";
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";

type ArticleListsProps = {
  articleData: Article;
};

function CardIcons({ articleData }: ArticleListsProps) {
  return (
    <div className="flex justify-between gap-3 items-center">
      {/* お気に入りボタン */}
      <LikeButton articleData={articleData} />

      {/* カテゴリ */}
      <CiCircleList />

      {/* アーカイブボタン */}
      <FaArchive />

      {/* デリートボタン */}
      {articleData.isArchived === true && (
        <DeleteButton articleData={articleData} />
      )}
    </div>
  );
}

export default CardIcons;
