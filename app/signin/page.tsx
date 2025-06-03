"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const fromExtension = searchParams.get("from") === "extension";

  useEffect(() => {
    // セッションが読み込み完了して、ログイン済みの場合
    if (status === "authenticated" && session) {
      if (fromExtension) {
        // 拡張機能からのアクセスの場合は成功ページを表示
        showExtensionSuccess();
      } else {
        // 通常のアクセスの場合はホームページにリダイレクト
        router.push("/");
      }
    }
  }, [status, session, fromExtension, router]);

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn("google", {
        callbackUrl: fromExtension ? "/signin?from=extension" : "/",
      });
    } catch (error) {
      console.error("サインインエラー:", error);
      setIsLoading(false);
    }
  };

  const showExtensionSuccess = () => {
    document.body.innerHTML = `
      <div style="
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        font-family: Arial, sans-serif;
        background-color: #f0f9ff;
      ">
        <div style="
          background: white;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          text-align: center;
          max-width: 500px;
        ">
          <div style="
            width: 60px;
            height: 60px;
            background: #10b981;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1rem;
          ">
            <span style="color: white; font-size: 24px;">✓</span>
          </div>
          <h2 style="color: #10b981; margin-bottom: 1rem; font-size: 24px;">
            ログイン完了！
          </h2>
          <p style="color: #6b7280; margin-bottom: 1.5rem; line-height: 1.5;">
            拡張機能で記事の保存ができるようになりました！<br>
            このタブを閉じて、保存したいページで拡張機能をクリックしてください。
          </p>
          
          <a href="/" style="
            background: #6b7280;
            color: white;
            text-decoration: none;
            padding: 0.75rem 1.5rem;
            border-radius: 6px;
            display: inline-block;
            font-size: 14px;
          ">
            アプリを開く
          </a>
        </div>
      </div>
    `;

    // 5秒後に自動でページを閉じる
    setTimeout(() => {
      window.close();
    }, 5000);
  };

  // ローディング中は何も表示しない
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

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
          my-pocketにサインイン
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {fromExtension
            ? "拡張機能を使用するためにサインインしてください"
            : "記事を保存・管理するためにサインインしてください"}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div>
            <button
              onClick={handleSignIn}
              disabled={isLoading}
              className="w-full flex justify-center items-center py-3 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
              ) : (
                <>
                  <svg
                    className="w-5 h-5 mr-3"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Googleでサインイン
                </>
              )}
            </button>
          </div>

          {fromExtension && (
            <div className="mt-6 p-4 bg-blue-50 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-blue-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-blue-700">
                    拡張機能からのアクセスです。ログイン後、このページは自動で閉じられます。
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="mt-6">
            <div className="text-center text-sm text-gray-600">
              <p>
                サインインすることで、
                <br />
                利用規約とプライバシーポリシーに
                <br />
                同意したものとみなされます
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
