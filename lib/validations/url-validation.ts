import { z } from "zod";

export const urlRegistrationSchema = z.object({
  url: z
    .string()
    .min(1, "URLを入力してください")
    .url("有効なURLを入力してください"),
});
