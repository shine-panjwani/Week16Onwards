import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ChatAppContextProvider } from './AppContext.tsx'
createRoot(document.getElementById('root')!).render(
 <ChatAppContextProvider>
  <App />
 </ChatAppContextProvider>
    
)
