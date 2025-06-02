"use server";

import { redirect } from "next/navigation";

export async function redirectWithQuery(formData: FormData) {

  const query = formData.get("query") as string;

  if (!query || query.trim() === "") {
    return;
  }

  const redirectUrl = `/?q=${encodeURIComponent(query)}`;

  redirect(redirectUrl);
}
