import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const pgClient = new PrismaClient();
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { email, password } = data;
    console.log(data);
    const user = await pgClient.user.create({
      data: {
        email,
        password,
      },
    });
    return NextResponse.json({
      user: user,
      msg: "You have been signed up!!",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ msg: "Error during signup" }, { status: 500 });
  }
}
export async function GET(req: NextRequest) {
  try {
    const response = await pgClient.user.findMany();
    return NextResponse.json({
      msg: "Found",
      users: response,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      msg : "Error while signing up!!",
      error : error
    })
  }
}
