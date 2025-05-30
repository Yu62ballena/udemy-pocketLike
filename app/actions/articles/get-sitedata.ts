"use server";

import { checkUrlExists } from "./check-duplicate";
import { saveArticle } from "./save-article";
import { extractUrlData } from "../extract-url-data";

export const getSiteData = async (formData: FormData) => {
  try {
    const url = formData.get("url") as string;

    // urlの重複チェック
    const isDuplicate = await checkUrlExists(url);
    if (isDuplicate) {
      console.log("この記事はすでに登録されています");
      return;
    }

    // 一時的なユーザーIDを定義
    // あとでログイン中のユーザーのユーザーIDを取得するコードに差し替える
    const UserId = "temp-user-123";

    // 重複がないことを確認できたら、URLからサイトのデータを取得
    const result = await extractUrlData(formData);

    // 取得したデータをDBに保存
    const saveResult = await saveArticle(result, UserId);

    //
    if (saveResult?.success) {
      console.log("記事が保存されました。");
      console.log("保存結果", saveResult);
    }
  } catch (error) {
    console.log(error);
  }
};
