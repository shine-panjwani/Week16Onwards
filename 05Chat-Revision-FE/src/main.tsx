import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AppcontextProvider } from './AppContext.tsx'

createRoot(document.getElementById('root')!).render(
  <AppcontextProvider>
    <App />
  </AppcontextProvider>,
)
