import { useEffect, useCallback } from "react";

interface UseInfiniteScrollProps {
  loadMore: () => Promise<void>;
  hasMore: boolean;
  isLoading: boolean;
  threshold?: number;
}

export const useInfiniteScroll = ({
  loadMore,
  hasMore,
  isLoading,
  threshold = 200,
}: UseInfiniteScrollProps) => {
  const handleScroll = useCallback(() => {
    if (!hasMore || isLoading) return;

    // ページの下部に近づいたら読み込み開始
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    // 下から200px以内に来たら次のページを読み込み
    if (scrollHeight - scrollTop - clientHeight < threshold) {
      loadMore();
    }
  }, [loadMore, hasMore, isLoading, threshold]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);
};

export default useInfiniteScroll;
