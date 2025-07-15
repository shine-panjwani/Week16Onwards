import { useContext, useEffect, useRef } from "react";
import { copyIcon } from "../utils/Utils";
import { Appcontext } from "../AppContext";

const ChatArea = () => {
    const content = useContext(Appcontext)
    const socketRef = useRef<WebSocket | null>(null)
    if (!content) return;
    const { roomCode, input, setInput, allMsgs, setAllMsgs } = content;
    function sendBtn() {
        if (socketRef.current && socketRef.current.readyState === 1) {
            socketRef.current.send(JSON.stringify({
                type: "chat",
                payload: {
                    message: input
                }
            }))
        }
        // setAllMsgs(p=>[...p,input])
        setInput("")
    }
    useEffect(() => {
        const ws = new WebSocket("ws://localhost:3000")
        socketRef.current = ws;
        console.log(socketRef);
        console.log(ws);
        ws.onopen = () => {
            ws.send(JSON.stringify({
                type: "join",
                payload: {
                    roomId: roomCode
                }
            }))
        }
        ws.onmessage = (e) => {
            console.log(e);
            const parsedData = JSON.parse(e.data);
            console.log(parsedData.payload.message);
            if (parsedData.type === "chat") {
                setAllMsgs(p => [...p, parsedData.payload.message])
            }
        }
        return () => {
            ws.close();
        }
    }, [])
    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4">
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
                    <div className="flex items-center gap-2">
                        Room Code: <span className="font-bold tracking-wide">{roomCode}</span>
                        <button className="text-gray-500 hover:text-black cursor-pointer"
                            onClick={() => {
                                // navigator.clipboard.writeText(roomCode)
                            }}
                        >{copyIcon}</button>
                    </div>
                </div>

                {/* Chat Box */}
                <div className="h-80 overflow-y-auto border border-gray-200 rounded-md p-4 bg-white text-gray-800 text-sm font-mono">
                    {allMsgs.map((msg, index) => {
                        return <div key={index}>
                            <div>{msg}</div>
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
                    <button
                        onClick={sendBtn}
                        className="px-4 py-2 bg-black text-white rounded-lg cursor-pointer font-mono font-semibold hover:bg-gray-900 transition">
                        Send
                    </button>
                </div>

            </div>
        </div>

    )
}

export default ChatArea