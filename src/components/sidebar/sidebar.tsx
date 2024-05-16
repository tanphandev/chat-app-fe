"use client";
import Image from "next/image";
import searchIcon from "@/../public/icons/search.svg";
import ChannelItem from "./channel-item";
import { useEffect } from "react";
import { useChatContext } from "@/contexts/chat.context";
function Sidebar() {
  const { rooms } = useChatContext();
  console.log("rooms", rooms);
  return (
    <div className="pt-5 px-4 w-auto sm:w-[360px] h-[calc(100vh-64px)] flex flex-col">
      <div>
        <div className="text-2xl font-bold">Chats</div>
        <div className="sm:flex text-base p-[10px] rounded-full bg-[#f0f2f5] mb-2 hidden">
          <Image src={searchIcon} alt="search-icon" width={16} height={16} className="mr-2" />
          <input className="font-semibold bg-transparent outline-none" type="text" placeholder="Search Messenger" />
        </div>
      </div>
      <div className="overflow-y-scroll flex-1">
        {rooms?.map((room: any, index) => (
          <ChannelItem key={index} room={room} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
