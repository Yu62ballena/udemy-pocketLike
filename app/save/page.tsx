import { redirect } from "next/navigation";
import { getSiteData } from "../actions/articles/get-sitedata";
import { getCurrentUserId } from "@/lib/auth-helpers";

interface SavePageProps {
  searchParams: Promise<{
    url?: string;
    title?: string;
  }>;
}

export default async function SavePage(props: SavePageProps) {
  try {
    // 認証チェック
    await getCurrentUserId(); // userIdを変数に代入せず直接呼び出し

    const searchParams = await props.searchParams;
    const { url } = searchParams; // titleは削除（使わないため）

    if (url) {
      // 記事保存処理
      const formData = new FormData();
      formData.append("url", url);

      const result = await getSiteData(formData);

      if (result?.success) {
        redirect("/?message=記事を保存しました");
      } else {
        redirect("/?error=記事の保存に失敗しました");
      }
    }

    // URLがない場合はホームへ
    redirect("/");
  } catch (error) {
    // 未ログインの場合はサインインページへ
    console.error("Share save error:", error);
    redirect("/signin?from=share");
  }
}
