"use client";
import Sidebar from "@/components/sidebar/sidebar";
import { AblyProvider } from "ably/react";
import * as Ably from "ably";
import ChatContainer from "@/components/chat-container/chat-container";
import { useEffect, useMemo } from "react";
import { useChatContext } from "@/contexts/chat.context";
import { getRoomByUserId } from "@/services/room.service";
import { API_ROUTES } from "@/configs/api-routes";

export default function Home() {
  const { rooms, setRooms } = useChatContext();

  const client = useMemo(() => {
    return new Ably.Realtime({
      // TODO: Change endpoint to your own server to generate token request
      authUrl: API_ROUTES.createAblyRequestToken
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
        const data = await getRoomByUserId(userId!);
        setRooms(data);
      } catch (error) {
        console.log("[apiService] getRoomsByUserId error: ", error);
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
