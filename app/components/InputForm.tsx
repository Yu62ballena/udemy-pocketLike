"use client";

import { useState } from "react";
import { getSiteData } from "../actions/articles/get-sitedata";

import { redirectWithQuery } from "../actions/articles/redirect-with-query";

function InputForm() {
  // インプットフォーム切り替えようstate
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  return (
    <div className="flex gap-3 w-3/5 items-center">
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
        action={isRegisterMode ? getSiteData : redirectWithQuery}
        className="flex gap-3 flex-1"
      >
        <input
          type={isRegisterMode ? "url" : "text"}
          name={isRegisterMode ? "url" : "query"}
          placeholder={
            isRegisterMode
              ? "https://example.com/article"
              : "タイトルやサイト名で検索"
          }
          required
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
  );
}

export default InputForm;
