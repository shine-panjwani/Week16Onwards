import { createContext, useState } from "react";
interface SocketInterface {
    name :string
    roomId: string
}
interface ChatAppContextInterface {
    name: string,
    roomCode: string,
    newUser: SocketInterface[],
    userCount: number,
    createRoom : boolean,
    setcreateRoom : React.Dispatch<React.SetStateAction<boolean>>
    setName: React.Dispatch<React.SetStateAction<string>>
    setRoomCode: React.Dispatch<React.SetStateAction<string>>,
    setUserCount: React.Dispatch<React.SetStateAction<number>>,
    setNewUser: React.Dispatch<React.SetStateAction<SocketInterface[]>>
    // roomRef : React.MutableRefObject<string |null>,
    isJoined : boolean,
    setIsJoined : React.Dispatch<React.SetStateAction<boolean>>,
    inputMsg : string[],
    setInputMsg : React.Dispatch<React.SetStateAction<string[]>>, 
}
export const ChatAppContext = createContext<ChatAppContextInterface | null>(null)
export const ChatAppContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [name, setName] = useState<string>("")
    const [roomCode, setRoomCode] = useState<string>("")
    const [newUser, setNewUser] = useState<SocketInterface[]>([])
    const [userCount, setUserCount] = useState<number>(0)
    const [createRoom,setcreateRoom] = useState<boolean>(false)
    const [isJoined,setIsJoined] = useState<boolean>(false)
    // const roomRef = useRef<string|null>(null);
    const [inputMsg,setInputMsg] = useState<string[]>([])
    return (
        <ChatAppContext.Provider value={{ name, setName, roomCode, setRoomCode, newUser, setNewUser, userCount,setIsJoined, isJoined, setUserCount ,createRoom,setcreateRoom,inputMsg,setInputMsg}}>
            {children}
        </ChatAppContext.Provider>
    )
}