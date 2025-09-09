import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from './components/Login';
import Chat from './components/Chat';
import { useAuthStore } from './store/authStore';

function App() {
  const { isAuthenticated } = useAuthStore();

  return (
    <Router>
      <div className="h-screen bg-whatsapp-gray">
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#25D366',
              color: '#fff',
            },
          }}
        />
        <Routes>
          <Route 
            path="/" 
            element={isAuthenticated ? <Chat /> : <Login />} 
          />
          <Route 
            path="/chat" 
            element={isAuthenticated ? <Chat /> : <Login />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


