import { useChatContext } from "@/contexts/chat.context";

function MessageItem({ message, senderId }: { message: string; senderId: string }) {
  const { userInCurrentRoom } = useChatContext();
  const myId = localStorage.getItem("userId");
  switch (senderId) {
    case myId:
      return <MyMessage message={message} />;
    default:
      return <MessageOfOrther message={message} />;
  }
}

const MyMessage = ({ message }: { message: string }) => {
  return (
    <div className="flex justify-end mr-5 my-2">
      <div className="py-2 px-3 rounded-full bg-[#0084ff] text-white text-sm">{message}</div>
    </div>
  );
};

const MessageOfOrther = ({ message }: { message: string }) => {
  return (
    <div className="flex justify-start ml-8 my-2">
      <div className="py-2 px-3 rounded-full bg-[#E4E6EB] text-sm">{message}</div>
    </div>
  );
};

export default MessageItem;
