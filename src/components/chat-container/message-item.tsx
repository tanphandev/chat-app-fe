import { useChatContext } from "@/contexts/chat.context";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";

function MessageItem({ message, senderId }: { message: string; senderId: string }) {
  const { userInCurrentRoom } = useChatContext();
  const myId = localStorage.getItem("userId");
  switch (senderId) {
    case myId:
      return <MyMessage message={message} />;
    default:
      return <MessageOfOrther message={message} senderId={senderId} />;
  }
}

const MyMessage = ({ message }: { message: string }) => {
  return (
    <div className="flex justify-end mx-5 my-2">
      <div className="py-2 px-3 rounded-[18px] bg-[#0084ff] text-white text-sm">{message}</div>
    </div>
  );
};

const MessageOfOrther = ({ message, senderId }: { message: string; senderId: string }) => {
  const { userInCurrentRoom } = useChatContext();
  const currentUser = userInCurrentRoom.find((user) => user?.id === senderId);
  return (
    <div className="flex justify-start items-end mx-5 my-2 gap-1">
      <Avatar className="w-7 h-7">
        <AvatarImage src={currentUser?.avtar} alt="@shadcn" />
        <AvatarFallback>{currentUser?.name?.[0]?.toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="py-2 px-3 rounded-[18px] bg-[#E4E6EB] text-sm">{message}</div>
    </div>
  );
};

export default MessageItem;
