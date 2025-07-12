import { useEffect, useRef, useState } from 'react'
import './App.css'
function App() {
  const [input, setInput] = useState<string>("")
  const socketRef = useRef<WebSocket | null>(null)
  const [msg, setMsg] = useState<string[]>([])


  function sendMessage(){
    if(socketRef.current && socketRef.current.readyState ===1){
      socketRef.current.send(input)
      setMsg(p=>[...p, `Message from client : ${input}`])
      setInput("");
    }
  }
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3000")
    socketRef.current = ws;
    ws.onopen = () => {
      console.log("Connection open");
    }
    ws.onclose = () => {
      console.log("connection closed");
    }

    ws.onmessage = (e) => {
      setMsg(p => [...p, `${e.data}`]);
    }
    return () => {
      ws.close()
    }
  }, [])
  return (
    <>
      <h1>Web sockets!!</h1>
      <input type="text" style={{ padding: "10px", width: "200px" }}
        placeholder='Enter ping!!'
        onChange={(e) => {
          setInput(e.target.value)
        }}
      />
      <p>Input entered : {input}</p>
      <button onClick={sendMessage}>Submit</button>
      <ul>
        {msg.map((msg,index)=>{
          return <li key={index}>{msg}</li>
        })}
      </ul>
    </>
  )
}

export default App
