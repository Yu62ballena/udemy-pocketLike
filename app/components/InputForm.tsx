import { checkUrlExists } from "../actions/articles/check-duplicate";
import { saveArticle } from "../actions/articles/save-article";
import { extractUrlData } from "../actions/extract-url-data";

function InputForm() {
  const getSiteData = async (formData: FormData) => {
    "use server";
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

  return (
    <form
      action={getSiteData}
      className="flex gap-2 w-3/5"
    >
      <input
        type="url"
        name="url"
        placeholder="https://example.com/article"
        required
        className="w-full px-3 py-2 border"
      />
      <button
        type="submit"
        className="w-28 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        取得
      </button>
    </form>
  );
}

export default InputForm;
