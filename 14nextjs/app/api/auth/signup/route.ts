import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prismaCli = new PrismaClient();
export async function POST(req: NextRequest) {
  const response = await req.json();
  const { email, password } = response;
  const existingUser = await prismaCli.user.findUnique({
    where: {
      email,
    },
  });
  if (existingUser) {
    return NextResponse.json(
      {
        msg: "User already exists!!",
      },
      { status: 400 }
    );
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const userAdded =await prismaCli.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });
  return NextResponse.json({
    msg: "You are signed up!!",
    email: email,
    password: password,
    user : userAdded
  });
}
