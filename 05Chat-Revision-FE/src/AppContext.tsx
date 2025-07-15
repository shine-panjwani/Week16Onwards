import React, { createContext, useState } from "react";
interface AppContextInterface {
    name: string,
    roomCode: string,
    setName: React.Dispatch<React.SetStateAction<string>>,
    setRoomCode: React.Dispatch<React.SetStateAction<string>>,
    isJoined: boolean,
    setIsJoined: React.Dispatch<React.SetStateAction<boolean>>,
    createRoom: boolean,
    setCreateRoom: React.Dispatch<React.SetStateAction<boolean>>,
    allMsgs: string[],
    setAllMsgs: React.Dispatch<React.SetStateAction<string[]>>
    input :string,
    setInput: React.Dispatch<React.SetStateAction<string>>,
}
export const Appcontext = createContext<AppContextInterface | null>(null);
export const AppcontextProvider = ({ children }: { children: React.ReactNode }) => {
    const [name, setName] = useState<string>("")
    const [roomCode, setRoomCode] = useState<string>("")
    const [isJoined, setIsJoined] = useState<boolean>(false)
    const [createRoom, setCreateRoom] = useState<boolean>(false)
    const [allMsgs, setAllMsgs] = useState<string[]>([])
    const [input,setInput] = useState<string>("")
    return <Appcontext.Provider value={{input,setInput, name, setName, roomCode, setCreateRoom, isJoined, setIsJoined, createRoom, setRoomCode,allMsgs,setAllMsgs }}>
        {children}
    </Appcontext.Provider>
}
