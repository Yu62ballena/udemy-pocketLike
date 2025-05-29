import { Article } from "@prisma/client";
import LikeButton from "./LikeButton";
import CategoryButton from "./CategoryButton";
import ArchiveButton from "./ArchiveButton";
import DeleteButton from "./DeleteButton";

type ArticleListsProps = {
  articleData: Article;
};

function CardIcons({ articleData }: ArticleListsProps) {
  return (
    <div className="flex justify-between gap-3 items-center">
      {/* お気に入りボタン */}
      <LikeButton articleData={articleData} />

      {/* カテゴリボタン */}
      <CategoryButton articleData={articleData} />

      {/* アーカイブボタン */}
      <ArchiveButton articleData={articleData} />

      {/* デリートボタン */}
      {articleData.isArchived === true && (
        <DeleteButton articleData={articleData} />
      )}
    </div>
  );
}

export default CardIcons;
