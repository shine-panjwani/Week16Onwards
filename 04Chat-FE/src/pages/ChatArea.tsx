import { useContext, useEffect, useRef, useState } from "react"
import { copyIcon } from "../utils/utils"
import { ChatAppContext } from "../AppContext"

const ChatArea = () => {
    const content = useContext(ChatAppContext);
    if (!content) return
    const { roomCode, userCount, inputMsg, setInputMsg } = content;
    const [input, setInput] = useState<string>("")
    const socketRef = useRef<WebSocket | null>(null)
    function onSendBtn() {
        console.log("roomRef before sending message:", roomCode);
        if (socketRef.current && socketRef.current.readyState === 1) {
            socketRef.current.send(JSON.stringify({
                type: "chat",
                payload: {
                    message: input
                }
            }))
            // setInputMsg(p => [...p, input])
            setInput("")
        }
    }
    useEffect(() => {
        if (!roomCode) {
            console.error("RoomRef is null. Cannot join room.");
            return;
        }
        const ws = new WebSocket("ws://localhost:3000")
        socketRef.current = ws;


        ws.onopen = () => {
            ws.send(JSON.stringify({
                type: "join",
                payload: {
                    roomId: roomCode
                }
            }))
        }
        ws.onmessage = (e) => {
            try {

                const parsedData = JSON.parse(e.data)
                // console.log(e.data);
                if (parsedData.type === "chat") {
                    setInputMsg(p => [...p, parsedData.payload.message])
                }

            } catch (error) {

                console.error("Failed to parse message:", e.data);
            }
        }
        return () => {
            ws.close()
        }
    }, [])
    return (<div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="bg-white border border-gray-200 rounded-xl p-6 w-full max-w-2xl shadow-lg space-y-4">
            {/* Header */}
            <div>
                <div className="flex items-center space-x-2 mb-1">
                    <span className="text-2xl">💬</span>
                    <h1 className="text-2xl font-bold font-mono">Real Time Chat</h1>
                </div>
                <p className="text-sm text-gray-500">temporary room that expires after all users exit</p>
            </div>

            {/* Room Info */}
            <div className="flex justify-between items-center bg-gray-100 rounded-md px-4 py-2 text-sm font-mono text-gray-800">
                <div className="flex justify-center items-center">
                    Room Code: <div className="font-bold tracking-wide">{roomCode}</div>
                    <button className="ml-2 text-gray-500 hover:text-black cursor-pointer" onClick={() => {
                            if (roomCode) {
                                navigator.clipboard.writeText(roomCode)
                            }

                        }}>{copyIcon}</button>
                </div>
                <div>
                    Users: <span className="font-semibold">{userCount}</span>
                </div>
            </div>

            {/* Chat Box */}
            <div className="h-80 overflow-y-auto border border-gray-200 rounded-md p-4 bg-white text-gray-800 text-sm font-mono">
                {/* Messages will go here */}
                {inputMsg.map((msg, index) => {
                    console.log(msg);

                    return <div className="flex mb-1" key={index}>
                        <span className="px-4 py-2 bg-black text-white rounded-lg font-mono font-semibold">{msg}</span>
                    </div>
                })}
            </div>

            {/* Message Input */}
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
                <button onClick={onSendBtn} className="px-4 py-2 bg-black text-white rounded-lg cursor-pointer font-mono font-semibold hover:bg-gray-900 transition">
                    Send
                </button>
            </div>
        </div>
    </div>
    )
}

export default ChatArea