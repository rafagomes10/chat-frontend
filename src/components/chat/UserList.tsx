'use client';

import { useChat } from '@/context/ChatContext';

export default function UserList() {
  const { users, currentUser } = useChat();

  return (
    <div className="bg-gray-300 p-4 rounded-lg">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Usuários Online ({users.length})</h2>
      <ul className="space-y-2">
        {users.map((user, index) => (
          <li
            key={index}
            className={`px-3 py-2 rounded ${user === currentUser ? 'bg-green-100 font-bold' : 'bg-white'}`}
          >
            {user} {user === currentUser && '(você)'}
          </li>
        ))}
      </ul>
    </div>
  );
}