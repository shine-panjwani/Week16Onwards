import { useContext } from "react"
import { ChatAppContext } from "../AppContext"
import { copyIcon, generateRoomId } from "../utils/utils";

const Home = () => {
    const content = useContext(ChatAppContext)
    if (!content) return;
    const { name, setName, roomCode,userCount, setRoomCode, newUser,setNewUser, setUserCount, createRoom, setcreateRoom ,setIsJoined} = content;
    function onBtnClick() {
        console.log(name);
        console.log(roomCode);
        // console.log("roomRef before sending message:", roomRef.current);
        // roomRef.current = roomCode
        setUserCount(p=>p+1);
        console.log(userCount);
        
        setIsJoined(true);
        setNewUser(p=>[...p,{
            roomId : roomCode,
            name : name
        }])
        console.log(newUser);
        setName("")
        // setRoomCode("")
    }

    function createNewRoom() {
       const generated = generateRoomId();
        // console.log(roomRef.current);
        setRoomCode(generated);
        setcreateRoom(true);
        console.log("Heyy");
        
    }
    return (
        <div className="min-h-screen bg-white flex items-center justify-center">
            <div className="bg-white border border-gray-200 rounded-xl font-mono p-8 w-full max-w-md shadow-lg">
                <div className="flex items-center space-x-2 mb-2">
                    <span className="text-2xl">💬</span>
                    <h1 className="text-2xl font-bold font-mono">Real Time Chat</h1>
                </div>
                <p className="text-sm text-gray-500 mb-6">temporary room that expires after all users exit</p>
                <button
                    onClick={createNewRoom}
                    className="bg-black text-white w-full py-2 rounded-lg font-mono text-lg font-semibold mb-4 hover:bg-gray-900 transition">
                    Create New Room
                </button>
                <input
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value)
                    }}
                    type="text"
                    placeholder="Enter your name"
                    className="w-full mb-3 px-4 py-2 rounded-lg border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
                />
                <div className="flex gap-2">
                    <input
                        value={roomCode}
                        onChange={(e) => {
                            setRoomCode(e.target.value)
                        }}
                        type="text"
                        placeholder="Enter Room Code"
                        className="flex-1 px-4 py-2 rounded-lg border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    <button onClick={onBtnClick} className="px-4 py-2 bg-black text-white rounded-lg font-mono font-semibold hover:bg-gray-900 transition">
                        Join Room
                    </button>
                </div>
                {createRoom && <div className="h-35 w-full my-3 px-4 py-2 flex-col rounded-lg border flex justify-center items-center text-gray-800 border-gray-300 bg-gray-300">
                    <div>Share it with your friends</div>
                    <div className="flex">
                        <div>{roomCode}</div>
                        <div className="cursor-pointer" onClick={() => {
                            if (roomCode) {
                                navigator.clipboard.writeText(roomCode)
                            }

                        }}>{copyIcon}</div>
                    </div>

                </div>}


            </div>
        </div>

    )
}

export default Home