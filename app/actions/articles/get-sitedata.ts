"use server";

import { checkUrlExists } from "./check-duplicate";
import { saveArticle } from "./save-article";
import { extractUrlData } from "../extract-url-data";

export const getSiteData = async (formData: FormData) => {
  try {
    const url = formData.get("url") as string;

    const isDuplicate = await checkUrlExists(url);
    if (isDuplicate) {
      throw new Error("この記事はすでに登録されています");
    }

    const UserId = "temp-user-123";
    const result = await extractUrlData(formData);
    const saveResult = await saveArticle(result, UserId);

    if (saveResult?.success) {
      console.log("記事が保存されました。");
      return { success: true };
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
