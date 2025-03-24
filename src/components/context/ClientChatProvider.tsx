'use client';

import dynamic from 'next/dynamic';
import { ReactNode } from 'react';

// Use dynamic import to avoid SSR issues with socket.io
const ChatProviderWithNoSSR = dynamic(
  () => import('@/components/context/ChatProvider'),
  { ssr: false }
);

export default function ClientChatProvider({ children }: { children: ReactNode }) {
  return <ChatProviderWithNoSSR>{children}</ChatProviderWithNoSSR>;
}