'use client';

import { useChat } from '@/context/ChatContext';
import { useTicTacToe } from '@/context/TicTacToeContext';
import ChatBox from './ChatBox';
import UserList from '../userList/UserList';
import LoginForm from '../login/LoginForm';
import PieChart from '../graphic/PieChart';
import TicTacToe from '../game/TicTacToe';

export default function ChatLayout() {
  const { isLoggedIn, logout, currentUser } = useChat();
  const { gameActive } = useTicTacToe();

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
        <header className="bg-green-600 text-white p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Chat em Tempo Real</h1>
          <div className="flex items-center gap-2 font-bold">
            <span className="text-sm mr-2">Olá, {currentUser}</span>
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
            >
              Sair
            </button>
          </div>
        </header>

        {gameActive ? (
          <div className="flex-1 overflow-hidden flex items-center justify-center">
            <TicTacToe />
          </div>
        ) : (
          <div className="flex-1 overflow-hidden">
            <ChatBox />
          </div>
        )}
      </div>

      <div className="w-full md:w-2/4 h-1/4 md:h-screen p-4 overflow-y-auto border-l">
        <div>
          <PieChart />
        </div>
        <UserList />
      </div>
    </div>
  );
}