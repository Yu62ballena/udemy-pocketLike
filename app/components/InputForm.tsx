"use client";

import { useState, useTransition, useEffect } from "react";
import { getSiteData } from "../actions/articles/get-sitedata";
import { redirectWithQuery } from "../actions/articles/redirect-with-query";
import { urlRegistrationSchema } from "@/lib/validations/url-validation";
import { searchQuerySchema } from "@/lib/validations/search-validation";
import { useRouter } from "next/navigation";

function InputForm() {
  const router = useRouter();

  // インプットフォーム切り替えようstate
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  // バリデーションチェック
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // バリデーションをかけたURL登録の処理
  const handleFormSubmit = async (formData: FormData) => {
    setError(null);

    startTransition(async () => {
      try {
        // URL登録時の処理
        if (isRegisterMode) {
          console.log("URL登録開始");
          const url = formData.get("url") as string;
          console.log("URL:", url);

          // zodバリデーション
          const validationResult = urlRegistrationSchema.safeParse({ url });

          if (!validationResult.success) {
            const errorMessage = validationResult.error.errors
              .map((error) => error.message)
              .join(",");

            setError(errorMessage);
            return;
          }

          console.log("バリデーション通過");

          // ServerActionsの実行
          const result = await getSiteData(formData);
          console.log("getSiteData結果:", result);

          if (result?.success) {
            // 成功時の処理（フォームクリアなど）
            console.log("記事保存成功！");

            router.refresh();
            console.log("router.refresh実行");
          } else {
            console.log("記事保存失敗");
          }
        } else {
          // 検索時の処理
          const query = formData.get("query") as string;

          const validationResult = searchQuerySchema.safeParse({ query });

          if (!validationResult.success) {
            const errorMessage = validationResult.error.errors
              .map((error) => error.message)
              .join(",");

            setError(errorMessage);
            return;
          }

          await redirectWithQuery(formData);
        }
      } catch (err) {
        console.error("エラー発生:", err);

        if (err instanceof Error && err.message.includes("NEXT_REDIRECT")) {
          return;
        }

        const errorMessage =
          err instanceof Error ? err.message : "不明なエラーが発生しました";
        setError(errorMessage);
      }
    });
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="flex gap-3 w-3/5 items-center relative">
      <div className="flex gap-3 items-center w-full">
        {/* トグルスイッチ */}
        <div className="flex items-center gap-2 whitespace-nowrap">
          <span className="text-sm text-gray-600">URL登録</span>
          <button
            type="button"
            onClick={() => setIsRegisterMode(!isRegisterMode)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              isRegisterMode ? "bg-blue-600" : "bg-gray-300"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                isRegisterMode ? "translate-x-6" : "translate-x-1"
              }`}
            ></span>
          </button>
        </div>

        {/* インプットフォーム */}
        <form
          action={handleFormSubmit}
          className="flex gap-3 flex-1"
        >
          <input
            type="text"
            name={isRegisterMode ? "url" : "query"}
            placeholder={
              isRegisterMode
                ? "https://example.com/article"
                : "タイトルやサイト名で検索"
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-28 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isRegisterMode ? "取得" : "検索"}
          </button>
        </form>
      </div>

      {/* エラー表示部分 */}
      {error && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-red-50 border border-red-200 rounded-md p-3 shadow-lg z-10">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}
    </div>
  );
}

export default InputForm;
