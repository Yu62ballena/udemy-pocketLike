import { checkUrlExists } from "@/app/actions/articles/check-duplicate";
import { saveArticle } from "@/app/actions/articles/save-article";
import { extractUrlData } from "@/app/actions/extract-url-data";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url, title } = body;

    if (!url) {
      return NextResponse.json(
        {
          success: false,
          error: "URLが指定されていません",
        },
        {
          status: 400,
        }
      );
    }

    // 重複チェック
    const isDuplicate = await checkUrlExists(url);
    if (isDuplicate) {
      return NextResponse.json(
        {
          success: false,
          error: "この記事はすでに登録されています",
        },
        {
          status: 409,
        }
      );
    }

    // formDataを作成（既存のextraUrlDataを使用するため）
    const formData = new FormData();
    formData.append("url", url);

    // 一時的なユーザーIDを定義
    // あとでログイン中のユーザーのユーザーIDを取得するコードに差し替える
    const UserId = "temp-user-123";

    // URLからサイトのデータを取得
    const articleData = await extractUrlData(formData);

    // タイトルをメタデータから取得出来なかった場合は使用する
    if (!articleData.title && title) {
      articleData.title = title;
    }

    // 取得したデータをDBに保存
    const saveResult = await saveArticle(articleData, UserId);

    if (saveResult.success) {
      return NextResponse.json({
        success: true,
        message: "記事を保存しました",
        data: saveResult.data,
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          error: saveResult.error,
        },
        { status: 500 }
      );
    }
  } catch (err) {
    console.error("API保存エラー", err);

    return NextResponse.json(
      {
        success: false,
        error:
          err instanceof Error ? err.message : "不明なエラーが発生しました",
      },
      { status: 500 }
    );
  }
}

// 必要に応じて以下にCORS設定
export async function OPTIONS(request: NextRequest) {
  console.log(request);

  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
