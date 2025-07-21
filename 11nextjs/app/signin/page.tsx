"use client"
import React, { useState } from 'react'
const style ='outline px-4 py-2 m-3 rounded'
const page = () => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
  return (
    <div className='flex items-center justify-center h-screen w-screen flex-col'>
        <input value={email} onChange={(e)=>setEmail(e.target.value)} className={style} placeholder="Enter email" type="email" />
        <input value={password} onChange={(e)=>setPassword(e.target.value)} className={style} placeholder="Enter password" type="password" />
        <button onClick={()=>{
            
        }} className={style}>Signin</button>
    </div>
  )
}

export default page