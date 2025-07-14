import {  useRef, useState } from 'react'
import './App.css'
import ChatArea from './pages/ChatArea'
import Home from './pages/Home'
function App() {
  const [isJoined,setIsJoined] = useState<boolean>(false)
  const passwrodRef = useRef<string>(null)
  const [userCount,setUserCount] = useState<number>(0)
  return (
    <>
    {isJoined ? <ChatArea userCount={userCount} passwrodRef={passwrodRef} /> : <Home setUserCount = {setUserCount} passwrodRef={passwrodRef} setIsJoined = {setIsJoined}/>}
    </>
  )
}

export default App
