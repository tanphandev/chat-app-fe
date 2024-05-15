"use client";
import Sidebar from "@/components/sidebar/sidebar";
import { AblyProvider } from "ably/react";
import * as Ably from "ably";
import ChatContainer from "@/components/chat-container/chat-container";
import { useEffect, useMemo } from "react";
import { useChatContext } from "@/contexts/chat.context";

export default function Home() {
  const { rooms, setRooms } = useChatContext();

  const client = useMemo(() => {
    return new Ably.Realtime({
      // TODO: Change endpoint to your own server to generate token request
      authUrl: "http://localhost:4000/ably/auth"
    });
  }, []);

  useEffect(() => {
    const typeUserId = () => {
      let userId = localStorage.getItem("userId");
      if (!userId) {
        userId = prompt("Please enter your user ID:");
        if (!userId) {
          alert("User ID is required!");
          window.location.reload();
        } else {
          localStorage.setItem("userId", userId);
        }
      }
      return userId;
    };

    const fetchRoomByUserId = async () => {
      try {
        const userId = typeUserId();
        const res = await fetch(`http://localhost:4000/room/user/${userId}`);
        const data = await res.json();
        setRooms(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRoomByUserId();
  }, []);

  return (
    <AblyProvider client={client}>
      <div className="flex h-[calc(100%-60px)]">
        <Sidebar />
        <ChatContainer />
      </div>
    </AblyProvider>
  );
}
