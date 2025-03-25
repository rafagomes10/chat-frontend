'use client';

import { useChat } from '@/context/ChatContext';
import ChatBox from './ChatBox';
import UserList from './UserList';
import LoginForm from '../login/LoginForm';

export default function ChatLayout() {
  const { isLoggedIn } = useChat();

  if (!isLoggedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-800">
        <LoginForm />
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-800">
      <div className="w-full md:w-3/4 h-3/4 md:h-screen flex flex-col">
        <header className="bg-green-500 text-white p-4">
          <h1 className="text-xl font-bold">Chat em Tempo Real</h1>
        </header>
        <div className="flex-1 overflow-hidden">
          <ChatBox />
        </div>
      </div>
      <div className="w-full md:w-1/4 h-1/4 md:h-screen p-4 overflow-y-auto border-l">
        <UserList />
      </div>
    </div>
  );
}