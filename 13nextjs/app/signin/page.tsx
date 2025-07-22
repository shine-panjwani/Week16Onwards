"use client"
import axios from 'axios'
import React, { useState } from 'react'
const styles = 'outline px-5 py-2 m-3 rounded-md'
const page = () => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("");
  return (
    <div className='flex items-center justify-center h-screen flex-col'>
        <h1 className='text-3xl'>Signin</h1>
        <input className={styles} onChange={(e)=>setEmail(e.target.value)} type="email" value={email} placeholder='ab@gmail.com' />
        <input className={styles} type="password" value={password} placeholder='Enter password' onChange={(e)=>setPassword(e.target.value)} />
        <button className={styles} onClick={ async()=>{
            const res = await axios.post("http://localhost:3000/api/v1/signin",{
              email,
              password
            })
            localStorage.setItem("token" , res.data.token)
        }}>Signin</button>
    </div>
  )
}

export default page