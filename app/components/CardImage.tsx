import Image from "next/image";
import { Article } from "@prisma/client";

type ArticleListsProps = {
  articleData: Article;
};

function CardImage({ articleData }: ArticleListsProps) {
  return (
    <div className="relative w-full h-40">
      {articleData.thumbnail ? (
        <Image
          className="object-cover object-center"
          src={articleData.thumbnail}
          alt={articleData.title}
          fill={true}
          priority
          sizes="300px"
          onError={(e) => {
            // 画像が読み込めない場合の処理
            e.currentTarget.style.display = "none";
          }}
        />
      ) : (
        <div className="w-full h-40 bg-gray-200 rounded flex items-center justify-center">
          <span className="text-gray-400">画像なし</span>
        </div>
      )}
    </div>
  );
}

export default CardImage;
