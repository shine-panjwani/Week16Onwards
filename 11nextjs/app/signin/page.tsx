"use client"
import axios from 'axios'
import React, { useState } from 'react'
const style = "outline m-2 p-4 rounded-lg"
export const Page = () => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    return (
        <div className='flex justify-center items-center h-screen flex-col'>
            <p>{email}</p>
            <p>{password}</p>
            <input value={email} onChange={(e)=>setEmail(e.target.value)} className={style} placeholder='Enter email' type="email" name="" id="" />
            <input value={password} onChange={(e)=>setPassword(e.target.value)} className={style} placeholder='Ente password' type="password" name="" id="" />
            <button onClick={()=>{
                axios.post("",{
                    email,
                    password
                })
            }} className='outline px-3 py-1 m-4 rounded-lg'>Signin</button>
        </div>
    )
}

export default Page