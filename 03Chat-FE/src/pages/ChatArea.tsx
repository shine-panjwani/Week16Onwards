
import { useEffect, useRef, useState } from "react"
import { copyIcon } from "../utils"
// @ts-ignore
const ChatArea = ({ passwrodRef, userCount }) => {
    const [message, setMessage] = useState<string[]>([]);
    const [input, setInput] = useState<string>("")
    const socketRef = useRef<WebSocket | null>(null)
    function sendMsg() {
        if (socketRef.current && socketRef.current.readyState === 1) {
            socketRef.current.send(JSON.stringify({
                type: "chat",
                payload: {
                    message: input,
                    name: "guest"
                }
            }))
        }
        console.log(input);
        console.log(message);
        setInput("")

    }
    useEffect(() => {
        if(!passwrodRef.current)return;
        const ws = new WebSocket("ws://localhost:3000")
        socketRef.current = ws;
        console.log(socketRef);
        console.log(ws);
        ws.onopen = () => {
            ws.send(JSON.stringify({
                type: "join",
                payload: {
                    roomId: passwrodRef.current.toLowerCase(),
                    name: "Guest"
                }
            }))
        }
        ws.onmessage = (e) => {
            const parsedData = JSON.parse(e.data);
            setMessage(p => [...p, `${parsedData.message}`])
        }
        return () => {
            ws.close()
        }
    }, [passwrodRef.current])
    return (
        <><div className="min-h-screen bg-white flex items-center justify-center px-4">
            <div className="bg-white border border-gray-200 rounded-xl p-6 w-full max-w-2xl shadow-lg space-y-4 font-mono">
                <div>
                    <div className="flex items-center space-x-2 mb-1 font-mono">
                        <span className="text-2xl">💬</span>
                        <h1 className="text-2xl font-bold font-mono">Real Time Chat</h1>
                    </div>
                    <p className="text-sm text-gray-500">temporary room that expires after all users exit</p>
                </div>
                <div className="flex justify-between items-center bg-gray-100 font-mono rounded-md px-4 py-2 text-sm  text-gray-800">
                    <div className="flex">
                        Room Code: <div className="font-bold tracking-wide">{passwrodRef.current}</div>
                        <div onClick={() => navigator.clipboard.writeText(passwrodRef.current)} className='cursor-pointer'>{copyIcon}</div>
                    </div>
                    <div>
                        Users: <span className="font-semibold">{userCount}</span>
                    </div>
                </div>
                <div className="h-80 overflow-y-auto border border-gray-200 rounded-md p-4 bg-white text-gray-800 text-sm font-mono">
                    {/* Messages will go here */}
                    {message.map((message, index) => {
                        return <div className="mb-4" key={index}>

                            <span className="px-4 py-2 bg-black text-white rounded-lg" >{message}</span>
                        </div>
                    })}
                </div>
                <div className="flex items-center gap-2">
                    <input
                        value={input}
                        onChange={(e) => {
                            setInput(e.target.value)
                        }}
                        type="text"
                        placeholder="Type a message..."
                        className="flex-1 px-4 py-2 rounded-lg border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black text-sm font-mono"
                    />
                    <button onClick={sendMsg} className="px-4 py-2 bg-black text-white rounded-lg font-mono font-semibold hover:bg-gray-900 transition">
                        Send
                    </button>
                </div>
            </div>
        </div>
        </>
    )
}

export default ChatArea