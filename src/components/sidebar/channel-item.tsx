import avatar from "@/../public/avatar.png";
import { useChatContext } from "@/contexts/chat.context";
import Image from "next/image";

type Props = {
  room: any;
};

function ChannelItem({ room }: Props) {
  const { setRoomSelected, setUserInCurrentRoom } = useChatContext();
  return (
    <div
      onClick={() => {
        setRoomSelected(room);
        setUserInCurrentRoom(room?.users ?? []);
      }}
      className="transition-all py-4 px-2 flex gap-2 hover:bg-[#eaf3ff] rounded-lg cursor-pointer"
    >
      <Image src={avatar} alt="avatar" width={48} height={48} className="rounded-full" />
      <div className="flex flex-col">
        <h3 className="text-lg font-semibold">{room?.name}</h3>
        <div className="opacity-50">{room?.messages?.[room?.messages?.length - 1]?.body ?? ""}</div>
      </div>
    </div>
  );
}

export default ChannelItem;
