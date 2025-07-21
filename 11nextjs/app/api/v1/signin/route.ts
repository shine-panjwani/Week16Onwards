import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    const data = await req.json();
    const {email,password} = data;
    return NextResponse.json({
        
    })
}
export async function GRT(req:NextRequest) {
    
}