'use client';

import { useState, useEffect } from 'react';
import { useChat } from '@/context/ChatContext';
import { useTicTacToe } from '@/context/TicTacToeContext';

export default function UserList() {
  const { users, currentUser } = useChat();
  const { inviteToGame, pendingInvitation, acceptGameInvitation, declineGameInvitation } = useTicTacToe();
  const [hoveredUser, setHoveredUser] = useState<string | null>(null);
  const [inviteSent, setInviteSent] = useState<string | null>(null);
  const [showInvitation, setShowInvitation] = useState<boolean>(false);

  // Effect to handle the pending invitation timeout
  useEffect(() => {
    if (pendingInvitation) {
      setShowInvitation(true);

      const timer = setTimeout(() => {
        setShowInvitation(false);
        declineGameInvitation();
      }, 5000);

      // Clear timeout if component unmounts or invitation changes
      return () => clearTimeout(timer);
    } else {
      setShowInvitation(false);
    }
  }, [pendingInvitation, declineGameInvitation]);

  const handleInvite = (user: string) => {
    inviteToGame(user);
    setInviteSent(user);

    setTimeout(() => {
      setInviteSent(null);
    }, 5000);
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
        {users.map((user, index) => (
          <li
            key={index}
            className={`px-3 py-2 rounded text-black ${user === currentUser ? 'bg-green-200 font-bold' : 'bg-white'} relative`}
            onMouseEnter={() => user !== currentUser && setHoveredUser(user)}
            onMouseLeave={() => setHoveredUser(null)}
          >
            <div className="flex justify-between items-center">
              <span>{user} {user === currentUser && '(você)'}</span>

              {user !== currentUser && (hoveredUser === user || inviteSent === user) && (
                <div>
                  {inviteSent === user ? (
                    <span className="text-sm text-green-600">Convite enviado</span>
                  ) : (
                    <button
                      onClick={() => handleInvite(user)}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                    >
                      Convidar
                    </button>
                  )}
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}