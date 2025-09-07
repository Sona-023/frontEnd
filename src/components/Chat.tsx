import React, { useState, useRef, useEffect } from 'react';
import { 
  Phone, 
  Video, 
  MoreVertical, 
  Search, 
  Smile, 
  Mic, 
  Paperclip, 
  Send,
  LogOut,
  User,
  Heart
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useChatStore } from '../store/chatStore';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';
import Sidebar from './Sidebar';
import SymptomsChecker from './SymptomsChecker';
import { getMedicalResponse } from '../utils/medicalResponses';

const Chat: React.FC = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [showSymptomsChecker, setShowSymptomsChecker] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuthStore();
  const { messages, isBotTyping } = useChatStore();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleLogout = () => {
    logout();
  };

  const handleSendMessage = (text: string) => {
    if (text.trim()) {
      useChatStore.getState().addMessage({
        text: text.trim(),
        sender: 'user',
        type: 'text'
      });

      // Get medical response
      setTimeout(() => {
        useChatStore.getState().setBotTyping(true);
        
        setTimeout(() => {
          const medicalResponse = getMedicalResponse(text.trim());
          useChatStore.getState().addBotResponse(medicalResponse.response);
          
          // Add disclaimer if present
          if (medicalResponse.disclaimer) {
            setTimeout(() => {
              useChatStore.getState().addBotResponse(medicalResponse.disclaimer!);
            }, 1000);
          }
        }, 2000);
      }, 500);
    }
  };

  const handleAudioMessage = (audioBlob: Blob) => {
    // Create a URL for the audio blob
    const audioUrl = URL.createObjectURL(audioBlob);
    
    // Add audio message to chat
    useChatStore.getState().addMessage({
      text: 'Audio message',
      sender: 'user',
      type: 'audio',
      audioUrl: audioUrl
    });

    // Simulate bot response for audio
    setTimeout(() => {
      useChatStore.getState().setBotTyping(true);
      
      setTimeout(() => {
        useChatStore.getState().addBotResponse("I received your voice message. Could you please describe your symptoms in text so I can provide better assistance?");
      }, 2000);
    }, 500);
  };

  const handleSymptomsSelected = (symptoms: any[]) => {
    const symptomsText = symptoms.map(s => s.name).join(', ');
    const message = `I'm experiencing these symptoms: ${symptomsText}`;
    handleSendMessage(message);
  };

  return (
    <div className="h-screen flex bg-whatsapp-gray">
      {/* Sidebar */}
      <Sidebar 
        isOpen={showSidebar} 
        onClose={() => setShowSidebar(false)} 
        onLogout={handleLogout}
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-whatsapp-dark-gray px-4 py-3 flex items-center justify-between border-b border-gray-600">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowSidebar(true)}
              className="lg:hidden p-2 hover:bg-gray-700 rounded-full transition-colors"
            >
              <MoreVertical className="w-5 h-5 text-gray-300" />
            </button>
            <div className="w-10 h-10 bg-whatsapp-green rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-white font-semibold">WhatsApp</h2>
              <p className="text-gray-300 text-sm">AI Medical Assistant</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-gray-700 rounded-full transition-colors">
              <Video className="w-5 h-5 text-gray-300" />
            </button>
            <button className="p-2 hover:bg-gray-700 rounded-full transition-colors">
              <Phone className="w-5 h-5 text-gray-300" />
            </button>
            <button className="p-2 hover:bg-gray-700 rounded-full transition-colors">
              <Search className="w-5 h-5 text-gray-300" />
            </button>
            <button className="p-2 hover:bg-gray-700 rounded-full transition-colors">
              <MoreVertical className="w-5 h-5 text-gray-300" />
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto whatsapp-scrollbar p-4 space-y-4 bg-whatsapp-gray">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          
          {isBotTyping && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-whatsapp-green rounded-full flex items-center justify-center">
                <Heart className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white rounded-lg px-4 py-2 shadow-sm">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-whatsapp-dark-gray p-4">
          <ChatInput 
            onSendMessage={handleSendMessage}
            onSendAudio={handleAudioMessage}
            isRecording={isRecording}
            onRecordingChange={setIsRecording}
            onOpenSymptomsChecker={() => setShowSymptomsChecker(true)}
          />
        </div>
      </div>

      {/* Symptoms Checker Modal */}
      {showSymptomsChecker && (
        <SymptomsChecker
          onSymptomsSelected={handleSymptomsSelected}
          onClose={() => setShowSymptomsChecker(false)}
        />
      )}
    </div>
  );
};

export default Chat;
