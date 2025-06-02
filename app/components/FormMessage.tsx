import { useEffect, Dispatch, SetStateAction } from "react";
import { GrClose } from "react-icons/gr";

type FormMessageProps = {
  error: string | null;
  setError: Dispatch<SetStateAction<string | null>>;
  success: string | null;
  setSuccess: Dispatch<SetStateAction<string | null>>;
}


function FormMessage({error, setError, success, setSuccess}: FormMessageProps) {
  // エラーメッセージのタイマー
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  // 成功メッセージのタイマー
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [success]);
  return (
    <>
      {/* 成功メッセージ */}
      {success && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-green-50 border border-green-200 rounded-md p-3 shadow-lg z-10">
          <div className="flex items-center justify-between">
            <p className="text-green-700 text-sm">{success}</p>
            <button
              onClick={() => setSuccess(null)}
              className="text-green-500 hover:text-green-700 ml-2"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* エラー表示部分 */}
      {error && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-red-50 border border-red-200 rounded-lg p-3 shadow-lg z-10">
          <div className="flex items-start justify-between">
            <p className="text-red-600 text-sm">{error}</p>
            <button
              onClick={() => setError(null)}
              className="text-red-500 hover:text-red-700 ml-2"
            >
              <GrClose />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default FormMessage;
