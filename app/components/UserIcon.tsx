import Image from "next/image";

function UserIcon() {
  return (
    <div className="relative h-4/5 aspect-square">
      <Image
        className="object-contain"
        src="/yu-chanrio.png"
        fill={true}
        alt="ユーザーアイコン画像"
        sizes="80px"
      />
    </div>
  );
}

export default UserIcon;
