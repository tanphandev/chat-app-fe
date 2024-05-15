"use client";

import ChatProvider from "@/contexts/chat.context";

function Provider({ children }: { children: React.ReactNode }) {
  return <ChatProvider>{children}</ChatProvider>;
}

export default Provider;
