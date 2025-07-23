import NextAuth from "next-auth";
import  CredentialsProvider from "next-auth/providers/credentials";
// import GithubProvider from "next-auth/providers/github";
import {PrismaClient}  from "@prisma/client";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt"
const pgClient = new PrismaClient();
const handler = NextAuth({
    providers :[
        CredentialsProvider({
            name : "Email",
            credentials :{
                email : {label : "Username", type :"text"},
                password : {label : "Password" , type : "password"}
            },
            // @ts-ignore
            async authorize(credentials){
                const email = credentials?.email
                const password = credentials?.password;
                console.log(email);
                console.log(password);
                const user =await pgClient.user.findUnique({
                    where : {
                        email : email
                    }
                })
                if(!user){
                    return null
                }
                const isMatch = await bcrypt.compare(credentials?.password!, user.password);
                if(!isMatch){
                    return null
                }
                return {email :user.email, password : user.password}
            }
        }),
        GoogleProvider({
              clientId: process.env.GOOGLE_CLIENT_ID!,
              clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        })
    ],
    session:{
        strategy :"jwt"
    },
    pages :{
        signIn :"/signin"
    },
})
export{ handler as GET , handler as POST}