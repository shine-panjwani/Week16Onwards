import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest){
    const data =await req.json();
    console.log(data);
    return NextResponse.json({
        msg : "You have signed up!!"
    })
}