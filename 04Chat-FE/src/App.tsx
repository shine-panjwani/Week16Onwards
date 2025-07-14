
import './App.css'
import ChatArea from './pages/ChatArea'
import Home from './pages/Home'
import { ChatAppContext } from './AppContext'
import { useContext } from 'react'

function App() {
  const content = useContext(ChatAppContext)
  if(!content) return
  const {isJoined} = content;
  return (
    <>
    <>
      {isJoined ? <ChatArea/>:<Home/>}
      </>
    </>
  )
}

export default App
