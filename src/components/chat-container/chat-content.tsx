"use client";
import Image from "next/image";
import avatar from "@/../public/avatar.png";
import phoneIcon from "@/../public/phone.png";
import videoIcon from "@/../public/video.png";
import infoIcon from "@/../public/info.png";
import iconGroupInput from "@/../public/icon-chat-group-input.png";
import iconEmoji from "@/../public/imoji-icon.svg";
import likeIcon from "@/../public/like-icon.svg";
import { useEffect, useRef, useState } from "react";
import MessageItem from "./message-item";
import { useChannel } from "ably/react";
import { useChatContext } from "@/contexts/chat.context";
import { API_ROUTES } from "@/configs/api-routes";
function ChatContent() {
  const chatContentRef = useRef<HTMLDivElement>(null);

  const [messages, updateMessages] = useState<any[]>([]);
  const { roomSelected } = useChatContext();
  const { channel } = useChannel(roomSelected?.id, (message) => {
    updateMessages((prev) => [...prev, message.data]);
  });

  useEffect(() => {
    updateMessages(roomSelected?.messages || []);
  }, [roomSelected]);

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      try {
        // channel.publish("new-message", {
        //   senderId: localStorage.getItem("userId"),
        //   body: e.target.value,
        //   type: "text"
        // });
        fetch(API_ROUTES.createNewMessage, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            chatRoomId: roomSelected.id,
            senderId: localStorage.getItem("userId"),
            body: e.target.value,
            type: "text"
          })
        });
        e.target.value = "";
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    chatContentRef.current?.scrollTo({
      top: chatContentRef.current?.scrollHeight,
      behavior: "smooth"
    });
  }, [messages]);

  console.log("message", messages);

  return (
    <div className="flex flex-col justify-between flex-1 border-x-2 h-[calc(100vh-64px)]">
      <div className="h-[64px] px-4 flex items-center justify-between bg-white shadow-md border-b sticky top-0 left-0 right-0">
        <div className="flex gap-2 justify-center items-center">
          <Image src={avatar} alt="avatar" width={40} height={40} className="rounded-full mr-2" />
          <div className="flex flex-col justify-center items-center">
            <h3 className="text-lg font-bold">Tanphandev</h3>
            <p className="text-sm opacity-50">Active 9m ago</p>
          </div>
        </div>
        <div className="flex gap-[10px] items-center justify-center">
          <Image src={phoneIcon} alt="avatar" width={34} height={34} className="rounded-full cursor-pointer " />
          <Image src={videoIcon} alt="avatar" width={34} height={34} className="rounded-full cursor-pointer" />
          <Image src={infoIcon} alt="avatar" width={34} height={34} className="rounded-full cursor-pointer " />
        </div>
      </div>
      <div className="flex-1 overflow-y-scroll" ref={chatContentRef}>
        {messages?.map((message, index) => (
          <MessageItem key={index} message={message?.body} senderId={message?.senderId} />
        ))}
      </div>
      <div className="flex gap-3 items-center justify-between h-[60px] px-2">
        <Image src={iconGroupInput} alt="input" width={116} className="h-5" />
        <div className="flex-1 flex rounded-full bg-[#f0f2f5] h-[36px] p-2 overflow-hidden gap-2">
          <p className="text-[#65676B] text-sm">Aa</p>
          <input
            className="flex-1 bg-transparent outline-none text-sm"
            onKeyDown={(e) => {
              handleKeyPress(e);
            }}
          />
          <Image src={iconEmoji} alt="emoji" width={20} height={20} />
        </div>
        <Image src={likeIcon} alt="like" width={20} height={20} />
      </div>
    </div>
  );
}

export default ChatContent;
