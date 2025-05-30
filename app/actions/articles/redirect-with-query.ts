"use server";

import { redirect } from "next/navigation";

export async function redirectWithQuery(formData: FormData) {
  console.log("redirectWithQuery が実行されました");

  const query = formData.get("query") as string;
  console.log("取得したクエリ:", query);

  if (!query || query.trim() === "") {
    console.log("クエリが空です");
    return;
  }

  const redirectUrl = `/?q=${encodeURIComponent(query)}`;
  console.log("リダイレクト先URL:", redirectUrl);

  redirect(redirectUrl);
}
