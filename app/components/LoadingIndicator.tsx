interface LoadingIndicatorProps {
  isLoading: boolean;
  hasMore: boolean;
  articlesLength: number;
  loadMore: () => Promise<void>;
}

function LoadingIndicator({ isLoading, hasMore, articlesLength, loadMore }: LoadingIndicatorProps) {
  return (
    <>
      {/* ローディング表示 */}

      {isLoading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">読み込み中...</p>
        </div>
      )}

      {/* これ以上記事がない場合 */}
      {!hasMore && articlesLength > 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">すべての記事を表示しました</p>
        </div>
      )}

      {/* 手動読み込みボタン（オプション） */}
      {hasMore && !isLoading && (
        <div className="text-center py-8">
          <button
            onClick={loadMore}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            さらに読み込む
          </button>
        </div>
      )}
    </>
  );
}

export default LoadingIndicator;
