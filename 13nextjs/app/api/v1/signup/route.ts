import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    const response = await req.json();
    const {email,password} = response;
    return NextResponse.json({
        msg : "You are signed up!!",
        email : email,
        password : password
    })
}