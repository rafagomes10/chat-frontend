import { Socket } from "socket.io-client";

export interface Message {
  user: string;
  text: string;
  time: string;
}

export interface ChatContextType {
  socket: Socket | null;
  messages: Message[];
  users: string[];
  currentUser: string;
  isLoggedIn: boolean;
  login: (username: string) => void;
  sendMessage: (message: string) => void;
}
