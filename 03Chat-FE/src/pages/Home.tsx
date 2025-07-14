import { useState } from 'react'
import { randomCode, copyIcon } from '../utils'
interface User {
  name: string,
  roomId: string
}
// @ts-ignore
const Home = ({ setIsJoined, passwrodRef ,setUserCount}) => {
  const [newUser, setNewUser] = useState<User[]>([]);
  const [name, setName] = useState<string>("")
  const [roomId, setRoomId] = useState<string>("")
  const [createRoom, setCreateRoom] = useState<boolean>(false);
  function joinRoomBtn() {
    console.log(newUser);
    console.log(name);
    console.log(roomId);
    // @ts-ignore
    setUserCount(p =>p+1)
    setNewUser(p => [...p, { name, roomId  : roomId.toLowerCase()}])
    setIsJoined(true)
    setName("")
    setRoomId("")
  }
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="bg-white border border-gray-200 rounded-xl p-8 w-full max-w-md shadow-lg font-mono">
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-2xl">💬</span>
          <h1 className="text-2xl font-bold font-mono">Real Time Chat</h1>
        </div>
        <p className="text-sm text-gray-500 mb-6">temporary room that expires after all users exit</p>

        <button
          onClick={() => {
            setCreateRoom(true)
            passwrodRef.current = randomCode();
            console.log(passwrodRef);

          }}
          className="bg-black text-white w-full py-2 rounded-lg font-mono text-lg font-semibold mb-4 hover:bg-gray-900 transition">
          Create New Room
        </button>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value)
          }}
          placeholder="Enter your name"
          className="w-full mb-3 px-4 py-2 rounded-lg border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
        />
        <div className="flex gap-2">
          <input
            value={roomId}
            onChange={(e) => {
              setRoomId(e.target.value)
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
        {createRoom && <div
          className="w-full my-5 px-4 py-2 rounded-lg border  text-gray-800 bg-gray-200 border-gray-300 h-30 flex justify-center items-center flex-col"
        >
          <div>Share this code with your friend</div>
          <div className='flex'>
            <div onClick={(e) => { console.log(e.target); }}>{passwrodRef.current}</div>
            <div  onClick={() => navigator.clipboard.writeText(passwrodRef.current)} className='cursor-pointer'>{copyIcon}</div>
          </div>
        </div>}

      </div>
    </div>

  )
}

export default Home