'use client';

import { useState, useEffect } from 'react';
import { useChat } from '@/context/ChatContext';
import { useTicTacToe } from '@/context/TicTacToeContext';

export default function UserList() {
  const { users, currentUser } = useChat();
  const {
    inviteToGame,
    pendingInvitation,
    acceptGameInvitation,
    declineGameInvitation,
    gameActive,
    playersInGame
  } = useTicTacToe();

  const [hoveredUser, setHoveredUser] = useState<string | null>(null);
  const [inviteSent, setInviteSent] = useState<string | null>(null);
  const [showInvitation, setShowInvitation] = useState<boolean>(false);
  const [inviteCooldown, setInviteCooldown] = useState<boolean>(false);

  useEffect(() => {
    if (pendingInvitation) {
      setShowInvitation(true);

      const timer = setTimeout(() => {
        setShowInvitation(false);
        declineGameInvitation();
      }, 5000);

      return () => clearTimeout(timer);
    } else {
      setShowInvitation(false);
    }
  }, [pendingInvitation, declineGameInvitation]);

  const handleInvite = (user: string) => {
    if (playersInGame.includes(user)) {
      console.log(`Cannot invite ${user} because they are already playing`);
      return;
    }

    if (!canInviteUser(user)) {
      console.log(`Cannot invite ${user} due to other restrictions`);
      return;
    }

    inviteToGame(user);
    setInviteSent(user);

    setInviteCooldown(true);

    setTimeout(() => {
      setInviteSent(null);
    }, 5000);

    setTimeout(() => {
      setInviteCooldown(false);
    }, 5000);
  };

  const canInviteUser = (user: string) => {
    if (user === currentUser) return false;

    if (inviteCooldown) return false;

    if (gameActive) return false;

    if (playersInGame.includes(user)) {
      console.log(`${user} is in game and cannot be invited`);
      return false;
    }

    return true;
  };

  return (
    <div className="bg-gray-400 p-4 rounded-lg">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Usuários Online ({users.length})</h2>

      {pendingInvitation && showInvitation && (
        <div className="mb-4 p-3 bg-blue-100 rounded-lg">
          <p className='text-gray-800'><strong>{pendingInvitation}</strong> convidou você para jogar!</p>
          <div className="flex space-x-2 mt-2">
            <button
              onClick={acceptGameInvitation}
              className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Aceitar
            </button>
            <button
              onClick={declineGameInvitation}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Recusar
            </button>
          </div>
        </div>
      )}

      <ul className="space-y-2">
        {users.map((user, index) => {
          // Verificação explícita se o usuário está jogando
          const isPlaying = playersInGame.includes(user);

          return (
            <li
              key={index}
              className={`px-3 py-2 rounded text-black ${user === currentUser ? 'bg-green-200 font-bold' : isPlaying ? 'bg-yellow-100' : 'bg-white'} relative`}
              onMouseEnter={() => user !== currentUser && setHoveredUser(user)}
              onMouseLeave={() => setHoveredUser(null)}
            >
              <div className="flex justify-between items-center">
                <span>
                  {user} {user === currentUser && '(você)'}
                  {isPlaying && ' (jogando)'}
                </span>

                {!isPlaying && user !== currentUser && (hoveredUser === user || inviteSent === user) && !gameActive && (
                  <div>
                    {inviteSent === user ? (
                      <span className="text-sm text-green-600">Convite enviado</span>
                    ) : (
                      <button
                        onClick={() => handleInvite(user)}
                        className={`px-3 py-1 text-white rounded text-sm ${inviteCooldown ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
                          }`}
                        disabled={inviteCooldown}
                      >
                        Convidar
                      </button>
                    )}
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}