import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const pgClient = new PrismaClient();
import bcrypt from "bcrypt";
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;
    const existingUser = await pgClient.user.findUnique({
      where: {
        email,
      },
    });
    if (existingUser) {
      console.log("User already exists!!");
    }
    const hashedPassword =await bcrypt.hash(password, 10)
    const newUser = await pgClient.user.create({
        data :{
            email,
            password : hashedPassword
        }
    })
    console.log(newUser);
    
    return NextResponse.json({
      msg: "Signed up!!",
      newUser  : newUser

    });
  } catch (error) {
    return NextResponse.json({
        msg : "Error"
    },{
        status : 500
    })
  }
}
