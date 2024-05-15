"use client";
import { useState } from "react";
import { ChannelProvider } from "ably/react";
import ChatContent from "./chat-content";
import { useChatContext } from "@/contexts/chat.context";
function ChatContainer() {
  const { roomSelected } = useChatContext();
  return (
    <ChannelProvider channelName={roomSelected?.id}>
      <ChatContent />
    </ChannelProvider>
  );
}

export default ChatContainer;
