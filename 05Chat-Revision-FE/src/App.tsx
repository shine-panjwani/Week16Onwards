// @import "tailwindcss";
import { useContext } from 'react'
import './App.css'
import Home from './pages/Home'
import ChatArea from './pages/ChatArea'
import { Appcontext } from './AppContext'
function App() {
  const content = useContext(Appcontext)
  if (!content) {
    return;
  }
  const { isJoined } = content;
  return (
    <>
      {isJoined ? <ChatArea /> : <Home />}
    </>
  )
}

export default App
