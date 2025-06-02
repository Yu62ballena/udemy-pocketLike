import React from "react";

type InputFormProps = {
  isRegisterMode: boolean;
  isPending: boolean;
  handleFormSubmit: (formData: FormData) => void;
}

function InputForm({isRegisterMode, isPending, handleFormSubmit}: InputFormProps) {
  return (
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
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
        disabled={isPending}
      />
      <button
        type="submit"
        className="w-28 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        disabled={isPending}
      >
        {isPending ? "処理中..." : isRegisterMode ? "取得" : "検索"}
      </button>
    </form>
  );
}

export default InputForm;
