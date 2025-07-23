import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
const pClient = new PrismaClient();
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentails",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
    // @ts-ignore
      async authorize(credentails) {
        if (!credentails?.email || !this.credentials.password) {
          throw new Error("Email and password required");
        }
        const user =await pClient.user.findUnique({
            where :{
                email : credentails.email
            }
        })
        if(!user){
            throw new Error("No user found")
        }
        const passwordMatch = await bcrypt.compare(credentails.password, user.password);
        if(!passwordMatch){
            throw new Error("Invalid password");
        }
        return {id : user.id, name:user.email, password : user.password }
      },
    }),
  ],
  pages:{
    signIn :"/signin"
  },
  session:{
    strategy:"jwt"
  },
  secret : process.env.NEXTAUTH_SECRET
});
export {handler as GET, handler as POST}