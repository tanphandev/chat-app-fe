import React, { createContext, useContext, useMemo, useState } from "react";

type ChatContextType = {
  rooms: any[];
  setRooms: React.Dispatch<React.SetStateAction<any[]>>;
  roomSelected: any;
  setRoomSelected: React.Dispatch<React.SetStateAction<any>>;
  userInCurrentRoom: any[];
  setUserInCurrentRoom: React.Dispatch<React.SetStateAction<any[]>>;
};

// create a context
const ChatContext = createContext<ChatContextType | null>(null);

// create a provider
export default function ChatProvider({ children }: { children: React.ReactNode }) {
  const [rooms, setRooms] = useState<any[]>([]);
  const [roomSelected, setRoomSelected] = useState<any>(null);
  const [userInCurrentRoom, setUserInCurrentRoom] = useState<any[]>([]);

  const data: ChatContextType = {
    rooms,
    setRooms,
    roomSelected,
    setRoomSelected,
    userInCurrentRoom,
    setUserInCurrentRoom
  };

  return <ChatContext.Provider value={data}>{children}</ChatContext.Provider>;
}

// create a hook to use the context
export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (context === null) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
};
