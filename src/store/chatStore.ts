import { create } from 'zustand';

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type: 'text' | 'audio';
  audioUrl?: string;
  isTyping?: boolean;
}

interface ChatState {
  messages: Message[];
  isBotTyping: boolean;
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  setBotTyping: (isTyping: boolean) => void;
  clearMessages: () => void;
  addBotResponse: (text: string) => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [
    {
      id: '1',
      text: 'Hello! I\'m your medical assistant. How can I help you today?',
      sender: 'bot',
      timestamp: new Date(),
      type: 'text'
    }
  ],
  isBotTyping: false,
  
  addMessage: (message) => {
    const newMessage: Message = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date()
    };
    
    set((state) => ({
      messages: [...state.messages, newMessage]
    }));
  },
  
  setBotTyping: (isTyping) => {
    set({ isBotTyping: isTyping });
  },
  
  clearMessages: () => {
    set({ messages: [] });
  },
  
  addBotResponse: (text: string) => {
    const botMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'bot',
      timestamp: new Date(),
      type: 'text'
    };
    
    set((state) => ({
      messages: [...state.messages, botMessage],
      isBotTyping: false
    }));
  }
}));


