import avatar from "@/../public/avatar.png";
import Image from "next/image";
function ChatInfo() {
  return (
    <div className="w-[360px] px-2">
      <div className="mt-4 flex flex-col items-center">
        <Image src={avatar} alt="avatar" width={80} height={80} className="rounded-full mb-2" />
        <h3 className="text-xl font-bold">Tanphandev</h3>
      </div>
    </div>
  );
}

export default ChatInfo;
