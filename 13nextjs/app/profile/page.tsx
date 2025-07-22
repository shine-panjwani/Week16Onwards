"use client"
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const page = () => {
    const [profile,setProfile] = useState("")
    useEffect(()=>{
        axios.get("http://localhost:3000/api/v1/profile",{
            headers:{
                Authorization : localStorage.getItem("token")
            }
        }).then((res)=>{
            setProfile(res.data.url)
        })
    },[])
  return (
    <div>{profile}</div>
  )
}

export default page