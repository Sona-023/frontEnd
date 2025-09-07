# WhatsApp Medical Frontend

A WhatsApp-like frontend for a medical chatbot application built with React, TypeScript, and Tailwind CSS.

## Features

### 🔐 Authentication
- Mobile number login with OTP verification
- User profile setup with name
- Persistent login state using Zustand

### 💬 Chat Interface
- WhatsApp-like UI design
- Real-time messaging with typing indicators
- Message bubbles with timestamps and read receipts
- Responsive design for mobile and desktop

### 🎤 Audio Messages
- Voice message recording
- Audio playback controls
- Visual audio waveform representation

### 🤖 Medical Assistant
- AI-powered medical chatbot responses
- Contextual medical advice and information
- Professional medical disclaimer

### 📱 Mobile-First Design
- Responsive layout that works on all devices
- Touch-friendly interface
- Mobile-optimized navigation

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **React Router** - Navigation
- **Lucide React** - Icons
- **React Hot Toast** - Notifications

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd whatsapp-medical-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Building for Production

```bash
npm run build
```

This builds the app for production to the `build` folder.

## Project Structure

```
src/
├── components/          # React components
│   ├── Login.tsx       # Login/authentication screen
│   ├── Chat.tsx        # Main chat interface
│   ├── MessageBubble.tsx # Individual message component
│   ├── ChatInput.tsx   # Message input with audio support
│   └── Sidebar.tsx     # Navigation sidebar
├── store/              # State management
│   ├── authStore.ts    # Authentication state
│   └── chatStore.ts    # Chat messages state
├── App.tsx             # Main app component
├── index.tsx           # App entry point
└── index.css           # Global styles
```

## Key Features Explained

### Authentication Flow
1. User enters phone number
2. OTP is sent (simulated)
3. User verifies OTP
4. User sets up profile
5. Access to chat interface

### Chat Interface
- Messages are stored in Zustand store
- Real-time typing indicators
- Audio message recording using MediaRecorder API
- Responsive message bubbles

### State Management
- **authStore**: Handles user authentication and profile data
- **chatStore**: Manages chat messages and bot responses

## Customization

### Styling
The app uses Tailwind CSS with custom WhatsApp-inspired colors defined in `tailwind.config.js`:

- `whatsapp-green`: Primary green color
- `whatsapp-blue`: Secondary blue color
- `whatsapp-gray`: Background colors
- `whatsapp-message-in/out`: Message bubble colors

### Medical Bot Responses
Bot responses are currently simulated with predefined responses. To integrate with a real medical AI:

1. Replace the simulated responses in `Chat.tsx`
2. Add API calls to your medical AI service
3. Implement proper error handling and loading states

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Disclaimer

This application is for demonstration purposes. The medical advice provided by the chatbot should not replace professional medical consultation. Always consult with qualified healthcare professionals for medical concerns.
