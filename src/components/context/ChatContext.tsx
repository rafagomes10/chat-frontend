'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';
import { Message, ChatContextType } from '@/types/chat';

const SOCKET_SERVER_URL = 'http://localhost:4000';

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<string[]>([]);
  const [currentUser, setCurrentUser] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // Inicializar socket
  useEffect(() => {
    const newSocket = io(SOCKET_SERVER_URL);
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  // Configurar listeners do socket
  useEffect(() => {
    if (!socket) return;

    // Receber mensagens
    socket.on('message', (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Atualizar lista de usuários
    socket.on('update-users', (updatedUsers: string[]) => {
      setUsers(updatedUsers);
    });

    return () => {
      socket.off('message');
      socket.off('update-users');
    };
  }, [socket]);

  // Função para login
  const login = (username: string) => {
    if (socket && username.trim()) {
      setCurrentUser(username);
      setIsLoggedIn(true);
      socket.emit('user-join', username);
    }
  };

  // Função para enviar mensagem
  const sendMessage = (message: string) => {
    if (socket && message.trim() && isLoggedIn) {
      socket.emit('send-message', message);
    }
  };

  const value = {
    messages,
    users,
    currentUser,
    isLoggedIn,
    login,
    sendMessage,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};