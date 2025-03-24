export interface Message {
    user: string;
    text: string;
    time: string;
  }
  
  export interface ChatContextType {
    messages: Message[];
    users: string[];
    currentUser: string;
    isLoggedIn: boolean;
    login: (username: string) => void;
    sendMessage: (message: string) => void;
  }