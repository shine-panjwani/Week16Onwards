import { useContext } from "react"
import { Appcontext } from "../AppContext"
import { generateRoomId,copyIcon } from "../utils/Utils";
const Home = () => {
  const content = useContext(Appcontext);
  if (!content) return
  const { name, setName, roomCode, setRoomCode, createRoom, setCreateRoom,setIsJoined } = content;
  function setCreateRoomBtn() {
    setCreateRoom(true)
    setRoomCode(generateRoomId());
  }
  function joinRoomBtn(){
    setIsJoined(true)
    setName("");
  }
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="bg-white border border-gray-200 rounded-xl p-8 w-full max-w-md shadow-lg space-y-4">

        {/* Header */}
        <div className="flex items-center space-x-2">
          <span className="text-2xl">💬</span>
          <h1 className="text-2xl font-bold font-mono">Real Time Chat</h1>
        </div>
        <p className="text-sm text-gray-500">temporary room that expires after all users exit</p>

        {/* Create Room Button */}
        <button
          onClick={setCreateRoomBtn}
          className="bg-black text-white w-full py-2 rounded-lg font-mono text-lg font-semibold hover:bg-gray-900 transition">
          Create New Room
        </button>

        {/* Input - Name */}
        <input
          value={name}
          onChange={(e) => {
            setName(e.target.value)
          }}
          type="text"
          placeholder="Enter your name"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
        />

        {/* Room Code + Join Button */}
        <div className="flex gap-2">
          <input
            value={roomCode}
            onChange={(e)=>{
              setRoomCode(e.target.value)
            }}
            type="text"
            placeholder="Enter Room Code"
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <button
          onClick={joinRoomBtn}
          className="px-4 py-2 bg-black text-white rounded-lg font-mono font-semibold hover:bg-gray-900 transition">
            Join Room
          </button>
        </div>
        {createRoom && <div className="flex-col h-30 flex justify-center items-center  py-2 rounded-lg border text-gray-800 border-gray-300 placeholder-gray-400 bg-gray-300">
          <div>Share it with your friends</div>
          <div className="flex items-center justify-center">
            
            <div >{roomCode}</div>
            <div className="cursor-pointer" onClick={()=>{
              navigator.clipboard.writeText(roomCode)
            }}>{copyIcon}</div>
          </div>
        </div>}
      </div>
    </div>

  )
}

export default Home