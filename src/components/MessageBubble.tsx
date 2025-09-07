import React from 'react';
import { Play, Pause, Download } from 'lucide-react';
import { Message } from '../store/chatStore';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [duration, setDuration] = React.useState(0);
  const [currentTime, setCurrentTime] = React.useState(0);
  const audioRef = React.useRef<HTMLAudioElement>(null);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAudioPlay = () => {
    if (message.audioUrl && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  React.useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, [message.audioUrl]);

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-2`}>
      <div className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
        {/* Avatar */}
        {!isUser && (
          <div className="w-8 h-8 bg-whatsapp-green rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white text-sm font-semibold">AI</span>
          </div>
        )}
        
        {/* Message Content */}
        <div className={`message-bubble ${isUser ? 'message-out' : 'message-in'} ${isUser ? 'ml-12' : 'mr-12'}`}>
          {message.type === 'text' ? (
            <div>
              <p className="text-sm leading-relaxed">{message.text}</p>
              <div className={`flex items-center justify-end mt-1 space-x-1 ${isUser ? 'text-gray-500' : 'text-gray-600'}`}>
                <span className="text-xs">{formatTime(message.timestamp)}</span>
                {isUser && (
                  <div className="flex space-x-1">
                    <span className="text-xs">✓</span>
                    <span className="text-xs">✓</span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <audio ref={audioRef} src={message.audioUrl} preload="metadata" />
              <button
                onClick={handleAudioPlay}
                className="w-8 h-8 bg-whatsapp-green rounded-full flex items-center justify-center hover:bg-whatsapp-green-dark transition-colors"
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 text-white" />
                ) : (
                  <Play className="w-4 h-4 text-white ml-0.5" />
                )}
              </button>
              <div className="flex-1">
                <div className="w-32 h-2 bg-gray-300 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-whatsapp-green rounded-full transition-all duration-100"
                    style={{ width: duration > 0 ? `${(currentTime / duration) * 100}%` : '0%' }}
                  ></div>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-gray-500">
                    {formatDuration(currentTime)} / {formatDuration(duration)}
                  </span>
                  <button 
                    className="text-gray-500 hover:text-gray-700"
                    onClick={() => {
                      if (message.audioUrl) {
                        const a = document.createElement('a');
                        a.href = message.audioUrl;
                        a.download = 'audio-message.wav';
                        a.click();
                      }
                    }}
                  >
                    <Download className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
