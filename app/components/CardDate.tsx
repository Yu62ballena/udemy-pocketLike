import { CiClock2 } from "react-icons/ci";
import { Article } from "@prisma/client";

type ArticleListsProps = {
  articleData: Article;
};

function CardDate({ articleData }: ArticleListsProps) {
  return (
    <div className="flex items-center">
      <CiClock2 className="mr-1" />
      <span>
        {articleData.publishedAt
          ? new Date(articleData.publishedAt).toLocaleDateString("ja-JP", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          : "公開日時データなし"}
      </span>
    </div>
  );
}

export default CardDate;
