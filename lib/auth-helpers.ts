import { redirect } from "next/navigation";
import { auth } from "./auth";

export async function getCurrentUser() {
  const session = await auth();

  if (!session?.user) {
    redirect("/signin");
  }

  return session.user;
}

export async function getCurrentUserId() {
  const user = await getCurrentUser();
  return user.id;
}
