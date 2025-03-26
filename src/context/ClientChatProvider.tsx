'use client';

import dynamic from 'next/dynamic';
import { ReactNode } from 'react';

// Use dynamic import to avoid SSR issues with socket.io
const ChatProviderWithNoSSR = dynamic(
  () => import('@/context/ChatProvider'),
  { ssr: false }
);

const TicTacToeProviderWithNoSSR = dynamic(
  () => import('@/context/TicTacToeProvider'),
  { ssr: false }
);

export default function ClientChatProvider({ children }: { children: ReactNode }) {
  return (
    <ChatProviderWithNoSSR>
      <TicTacToeProviderWithNoSSR>
        {children}
      </TicTacToeProviderWithNoSSR>
    </ChatProviderWithNoSSR>
  );
}