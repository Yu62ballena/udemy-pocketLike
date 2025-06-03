import { signOut, useSession } from "next-auth/react";

function SidebarUserInfo() {
  const { data: session } = useSession();

  return (
    <>
      {session?.user && (
        <div className="mt-auto mb-10 pl-6 pt-8 border-t lg:hidden">
          <div className="flex items-center gap-3">
            {session.user.image ? (
              <img
                src={session.user.image}
                alt="ユーザーアイコン"
                className="w-10 h-10 rounded-full"
              />
            ) : (
              <div className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center text-white font-bold">
                {session.user.name?.[0]?.toUpperCase() || "U"}
              </div>
            )}
            <div>
              <p className="font-medium text-sm">{session.user.name}</p>
              <p className="text-xs text-gray-500">{session.user.email}</p>
            </div>
          </div>

          {/* ログアウトボタン */}
          <button
            onClick={() => signOut({ callbackUrl: "/signin" })}
            className="mt-3 w-full text-left text-sm text-red-600 hover:text-red-800"
          >
            ログアウト
          </button>
        </div>
      )}
    </>
  );
}

export default SidebarUserInfo;
