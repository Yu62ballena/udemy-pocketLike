import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

function SidebarUserInfo() {
  const { data: session } = useSession();

  return (
    <>
      {session?.user && (
        <div className="p-4 border-t bg-white lg:hidden">
          <div className="flex items-center gap-3 mb-4">
            {session.user.image ? (
              <div className="relative w-12 h-12 flex-shrink-0 rounded-full overflow-hidden">
                <Image
                  className="object-cover"
                  src={session.user.image}
                  alt="ユーザーアイコン"
                  fill={true}
                  sizes="48px"
                />
              </div>
            ) : (
              <div className="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                {session.user.name?.[0]?.toUpperCase() || "U"}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="font-medium text-base truncate">
                {session.user.name}
              </p>
              <p className="text-sm text-gray-500 truncate">
                {session.user.email}
              </p>
            </div>
          </div>

          {/* ログアウトボタン */}
          <button
            onClick={() => signOut({ callbackUrl: "/signin" })}
            className="w-full py-2 px-4 text-center text-base bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-800 rounded-md transition-colors"
          >
            ログアウト
          </button>
        </div>
      )}
    </>
  );
}

export default SidebarUserInfo;
