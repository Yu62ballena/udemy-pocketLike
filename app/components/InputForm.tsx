import { extractUrlData, ArticleData } from "../actions/extract-url-data";


interface InputFormProps {
  addArticleData: (newArticle: ArticleData) => void;
}

function InputForm({addArticleData}:InputFormProps) {

    const getSiteData = async (formData: FormData) => {
      try {
        const result = await extractUrlData(formData);
        addArticleData(result)
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
