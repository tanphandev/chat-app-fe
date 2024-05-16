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
    <div className="pt-5 px-4 w-[360px] h-full">
      <div>
        <div className="text-2xl font-bold">Chats</div>
        <div className="flex text-base p-[10px] rounded-full bg-[#f0f2f5] mb-2">
          <Image src={searchIcon} alt="search-icon" width={16} height={16} className="mr-2" />
          <input className="font-semibold bg-transparent outline-none" type="text" placeholder="Search Messenger" />
        </div>
      </div>
      <div
        className="overflow-y-scroll"
        style={{
          height: `calc(100% - 60px - 200px)px`
        }}
      >
        {rooms?.map((room: any, index) => (
          <ChannelItem key={index} room={room} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
