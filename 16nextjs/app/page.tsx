"use client"; 
import Link from "next/link";
import { SessionProvider, signIn,signOut, useSession } from "next-auth/react";
const styles = "rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto";
export default function Home() {


  return (
    <SessionProvider>
    <HomePage/>
    </SessionProvider>
  );
}

export  function HomePage(){
  const {data : session , status} = useSession();
  return (
    <div className="font-sans items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <Link href={"/signup"} className={styles}> Signup</Link>
      <br />
      <Link href={"/signin"} className={styles}>Login</Link>
      <div>{status}</div>
       <div>
      {session ? (
        <>
          <p>Welcome, {session.user?.email}</p>
          <button onClick={() => signOut()}>Sign Out</button>
        </>
      ) : (
        <>
          <p>You are not signed in</p>
          <button onClick={() => signIn()}>Sign In</button>
        </>
      )}
    </div>
    <div>{session ?(
      <>
      <p>Welcome, {session.user?.email}</p>
      <button onClick={()=> signOut()}>Signout</button>
      </>
    ):<>
    </> }</div>
    </div>
  )
}