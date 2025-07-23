import NextAuth from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt"
const prisma = new PrismaClient();

const handler = NextAuth({
    providers :[
        CredentialsProvider({
            name : "credentials",
            credentials :{
                email : {label :"Email",placeholder:"Enter email",type :"text"},
                password :{label :"Password", placeholder :"Enter password", type:"password"}
            },
            // @ts-ignore
            async authorize(credentails){
                const email = credentails?.email;
                const password = credentails?.password;
                const user =await prisma.user.findUnique({
                    where :{
                        email : email
                    }
                })
                if(!user) return null;
                const isMatched = await bcrypt.compare(credentails!.password , user.password);
                if(!isMatched) return null;
                return {id : user.id +"", email : user.email}
            }
        })
    ],
    pages :{
        signIn:"/signin"
    },
    session :{
        strategy :"jwt"
    },
    secret : process.env.NEXTAUTH_SECRET
})
export {handler as GET, handler as POST}