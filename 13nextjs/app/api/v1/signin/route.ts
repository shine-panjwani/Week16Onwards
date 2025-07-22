import jwt from "jsonwebtoken"
import { NextRequest, NextResponse } from "next/server";
const JWTSECRET = "SHINE";
export async function POST(req: NextRequest){
    const response = await req.json();
    console.log(response);
    const userId = response.id;
    const token = await jwt.sign({userId}, JWTSECRET)
    return NextResponse.json({
      token : token,
      msg : "Signed in"
    })
}