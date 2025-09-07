import React from 'react';
import { 
  X, 
  User, 
  LogOut, 
  Settings, 
  MessageCircle, 
  Phone,
  Shield,
  Heart
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, onLogout }) => {
  const { user } = useAuthStore();

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-80 bg-whatsapp-dark-gray z-50 transform transition-transform duration-300 ease-in-out">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-gray-600">
            <div className="flex items-center justify-between">
              <h2 className="text-white text-lg font-semibold">Menu</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-700 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-300" />
              </button>
            </div>
          </div>

          {/* User Profile */}
          <div className="p-4 border-b border-gray-600">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-whatsapp-green rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold">{user?.name || 'User'}</h3>
                <p className="text-gray-400 text-sm">{user?.phoneNumber}</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="flex-1 p-4">
            <nav className="space-y-2">
              <button className="w-full flex items-center space-x-3 p-3 hover:bg-gray-700 rounded-lg transition-colors text-left">
                <MessageCircle className="w-5 h-5 text-gray-300" />
                <span className="text-gray-300">New Chat</span>
              </button>
              
              <button className="w-full flex items-center space-x-3 p-3 hover:bg-gray-700 rounded-lg transition-colors text-left">
                <Phone className="w-5 h-5 text-gray-300" />
                <span className="text-gray-300">Call History</span>
              </button>
              
              <button className="w-full flex items-center space-x-3 p-3 hover:bg-gray-700 rounded-lg transition-colors text-left">
                <Settings className="w-5 h-5 text-gray-300" />
                <span className="text-gray-300">Settings</span>
              </button>
              
              <button className="w-full flex items-center space-x-3 p-3 hover:bg-gray-700 rounded-lg transition-colors text-left">
                <Shield className="w-5 h-5 text-gray-300" />
                <span className="text-gray-300">Privacy</span>
              </button>
            </nav>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-600">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-whatsapp-green rounded-full flex items-center justify-center">
                <Heart className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm">WhatsApp</h4>
                <p className="text-gray-400 text-xs">AI Medical Assistant</p>
              </div>
            </div>
            
            <button
              onClick={onLogout}
              className="w-full flex items-center space-x-3 p-3 hover:bg-red-600 rounded-lg transition-colors text-left"
            >
              <LogOut className="w-5 h-5 text-red-400" />
              <span className="text-red-400">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
