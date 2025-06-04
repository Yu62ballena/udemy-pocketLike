import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

function SidebarUserInfo() {
  const { data: session } = useSession();

  return (
    <>
      {session?.user && (
        <div className="mt-auto mb-10 pl-6 pt-8 border-t lg:hidden">
          <div className="flex items-center gap-3">
            {session.user.image ? (
              <div className="relative w-12 md:w-14 h-12 md:h-14 flex-shrink-0 rounded-full overflow-hidden">
                <Image
                  className="object-cover"
                  src={session.user.image}
                  alt="ユーザーアイコン"
                  fill={true}
                  sizes="56px"
                />
              </div>
            ) : (
              <div className="w-12 md:w-14 h-12 md:h-14 bg-gray-400 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                {session.user.name?.[0]?.toUpperCase() || "U"}
              </div>
            )}
            <div>
              <p className="font-medium text-lg md:text-xl">
                {session.user.name}
              </p>
              <p className="text-xs md:text-lg text-gray-500">
                {session.user.email}
              </p>
            </div>
          </div>

          {/* ログアウトボタン */}
          <button
            onClick={() => signOut({ callbackUrl: "/signin" })}
            className="mt-5 w-full text-left text-lg text-red-600 hover:text-red-800"
          >
            ログアウト
          </button>
        </div>
      )}
    </>
  );
}

export default SidebarUserInfo;
