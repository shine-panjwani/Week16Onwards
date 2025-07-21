// "use client"
import axios from "axios";

export default async function User({ params }: {
    params: {
        userId: string
    }
}) {
    const {userId} = await params;
    const response =await axios.get(`https://dummyjson.com/users/${userId}`)
    const actualData = await response.data;
    const {firstName,lastName,age,gender,email} = actualData;
    return <div className="bg-blue-200 text-black"> 
    <div>
        <div>Firstname : {firstName}</div>
        <div>Last name : {lastName}</div>
        <div>Age : {age}</div>
        <div>Gender : {gender}</div>
        <div>Email : {email}</div>
    </div>
    </div>
}