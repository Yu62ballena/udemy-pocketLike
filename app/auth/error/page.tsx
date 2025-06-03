"use client";

import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

function AuthErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  // エラーの種類に応じてメッセージを変更
  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case "AccessDenied":
        return {
          title: "アクセスが拒否されました",
          message:
            "このアプリは許可されたメンバーのみ利用可能です。新規ユーザーの登録は受け付けておりません。",
          detail: "許可されたメールアドレスでのみログインが可能です。",
        };
      case "OAuthAccountNotLinked":
        return {
          title: "アカウントがリンクされていません",
          message: "このメールアドレスは既に別の方法で登録されています。",
          detail: "管理者にお問い合わせください。",
        };
      default:
        return {
          title: "ログインエラー",
          message: "ログイン処理中にエラーが発生しました。",
          detail: "しばらく待ってから再度お試しください。",
        };
    }
  };

  const errorInfo = getErrorMessage(error);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="relative h-20 w-20 mx-auto">
          <Image
            className="object-contain"
            src="/pocket-icon.png"
            alt="My Pocket Logo"
            fill={true}
            sizes="80px"
          />
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          My Pocket
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {/* エラーアイコン */}
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-red-100 p-3">
              <svg
                className="h-6 w-6 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
          </div>

          {/* エラーメッセージ */}
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {errorInfo.title}
            </h3>
            <p className="text-sm text-gray-600 mb-4">{errorInfo.message}</p>
            <p className="text-xs text-gray-500 mb-6">{errorInfo.detail}</p>
          </div>

          {/* アクション */}
          <div className="space-y-3">
            <Link
              href="/signin"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              サインインページに戻る
            </Link>

            {error === "AccessDenied" && (
              <div className="text-center">
                <p className="text-xs text-gray-500">
                  このアプリの利用をご希望の場合は、
                  <br />
                  管理者までお問い合わせください
                </p>
              </div>
            )}
          </div>

          {/* デバッグ情報（開発環境のみ） */}
          {process.env.NODE_ENV === "development" && error && (
            <div className="mt-6 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-400">
                Debug: Error type = {error}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AuthError() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthErrorContent />
    </Suspense>
  );
}
