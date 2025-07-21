"use client"
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
const style = 'outline px-4 py-2 m-3 rounded'
const page = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter();
    return (
        <div className='flex items-center justify-center h-screen w-screen flex-col'>
            <p>{email} {password}</p>
            <input value={email} onChange={(e) => setEmail(e.target.value)} className={style} placeholder="Enter email" type="email" />
            <input value={password} onChange={(e) => setPassword(e.target.value)} className={style} placeholder="Enter password" type="password" />
            <button onClick={async ()=>{
                try {
                await axios.post("http://localhost:3000/api/v1/signup",{
                    email,
                    password
                })
                router.push("/signin")
                } catch (error) {
                 console.log(error);
                }
            }} className={style}>Signup</button>
        </div>
    )
}

export default page