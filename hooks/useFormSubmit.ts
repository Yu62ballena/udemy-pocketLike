import { getSiteData } from "@/app/actions/articles/get-sitedata";
import { redirectWithQuery } from "@/app/actions/articles/redirect-with-query";
import { searchQuerySchema } from "@/lib/validations/search-validation";
import { urlRegistrationSchema } from "@/lib/validations/url-validation";
import { useRouter } from "next/navigation";

import { useState, useTransition } from "react";

export const useFormSubmit = (isRegisterMode: boolean) => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleFormSubmit = async (formData: FormData) => {
    setError(null);
    setSuccess(null);

    startTransition(async () => {
      try {
        // URL登録時の処理
        if (isRegisterMode) {
          const url = formData.get("url") as string;

          // zodバリデーション
          const validationResult = urlRegistrationSchema.safeParse({ url });

          if (!validationResult.success) {
            const errorMessage = validationResult.error.errors
              .map((error) => error.message)
              .join(",");

            setError(errorMessage);
            return;
          }

          // ServerActionsの実行
          try {
            const result = await getSiteData(formData);

            if (result?.success) {
              // 成功時の処理（フォームクリアなど）
              setSuccess("記事を保存しました！");

              // フォームをクリア
              const form = document.querySelector("form") as HTMLFormElement;
              if (form) {
                form.reset();
              }

              router.refresh();
            } else {
              // getSiteDataからの失敗の戻り値があったとき
              setError("記事の保存に失敗しました");

              console.log("記事保存失敗");
            }
          } catch (getSiteDataError) {
            // getSiteDataでthrowされたエラーをキャッチ
            console.error("getSiteDataエラー：", getSiteDataError);

            const errorMessage =
              getSiteDataError instanceof Error
                ? getSiteDataError.message
                : "不明なエラーが発生しました";

            setError(errorMessage);
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

  return {
    handleFormSubmit,
    error,
    success,
    isPending,
    setError,
    setSuccess
  };
};
