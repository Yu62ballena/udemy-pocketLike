import { z } from "zod";

export const searchQuerySchema = z.object({
  query: z
    .string()
    .min(1, "検索キーワードを入力してください")
    .max(100, "検索キーワードは100文字以内で入力してください。")
    .trim(),
});
