"use client"
import React, { useState } from 'react'
const styles = 'outline px-5 py-2 m-3 rounded-md'
const page = () => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("");
  return (
    <div className='flex items-center justify-center h-screen flex-col'>
        <h1 className='text-3xl'>Signup</h1>
        <input className={styles} onChange={(e)=>setEmail(e.target.value)} type="email" value={email} placeholder='ab@gmail.com' />
        <input className={styles} type="password" value={password} placeholder='Enter password' onChange={(e)=>setPassword(e.target.value)} />
        <button onClick={()=>{
            
        }}>Signup</button>
    </div>
  )
}

export default page