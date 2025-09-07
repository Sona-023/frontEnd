import React, { useState, useRef, useEffect } from 'react';
import { Smile, Mic, Paperclip, Send, Square, Stethoscope } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  onSendAudio: (audioBlob: Blob) => void;
  isRecording: boolean;
  onRecordingChange: (isRecording: boolean) => void;
  onOpenSymptomsChecker?: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  onSendAudio,
  isRecording,
  onRecordingChange,
  onOpenSymptomsChecker
}) => {
  const [message, setMessage] = useState('');
  const [isRecordingAudio, setIsRecordingAudio] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        onSendAudio(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecordingAudio(true);
      onRecordingChange(true);
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecordingAudio) {
      mediaRecorderRef.current.stop();
      setIsRecordingAudio(false);
      onRecordingChange(false);
    }
  };

  const handleMicClick = () => {
    if (isRecordingAudio) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <div className="flex items-center space-x-2">
      {/* Symptoms Checker Button */}
      {onOpenSymptomsChecker && (
        <button 
          onClick={onOpenSymptomsChecker}
          className="p-2 text-whatsapp-green hover:text-whatsapp-green-dark transition-colors"
          title="Symptom Checker"
        >
          <Stethoscope className="w-6 h-6" />
        </button>
      )}

      {/* Attachment Button */}
      <button className="p-2 text-gray-400 hover:text-gray-300 transition-colors">
        <Paperclip className="w-6 h-6" />
      </button>

      {/* Message Input */}
      <form onSubmit={handleSubmit} className="flex-1 flex items-center space-x-2">
        <div className="flex-1 relative">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="w-full px-4 py-3 bg-whatsapp-light-gray rounded-full border-none outline-none text-whatsapp-text-dark placeholder-whatsapp-text-light pr-12"
            disabled={isRecordingAudio}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <Smile className="w-5 h-5" />
          </button>
        </div>

        {/* Send/Record Button */}
        {message.trim() ? (
          <button
            type="submit"
            className="p-3 bg-whatsapp-green hover:bg-whatsapp-green-dark rounded-full transition-colors"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleMicClick}
            className={`p-3 rounded-full transition-colors ${
              isRecordingAudio
                ? 'bg-red-500 hover:bg-red-600 animate-pulse'
                : 'bg-whatsapp-green hover:bg-whatsapp-green-dark'
            }`}
            title={isRecordingAudio ? 'Stop recording (tap to stop)' : 'Hold to record voice message'}
          >
            {isRecordingAudio ? (
              <Square className="w-5 h-5 text-white" />
            ) : (
              <Mic className="w-5 h-5 text-white" />
            )}
          </button>
        )}
      </form>
    </div>
  );
};

export default ChatInput;
