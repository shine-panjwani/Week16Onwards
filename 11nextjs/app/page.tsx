import Link from "next/link";
export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        
        <h1 className="text-2xl">Todo Application</h1>
        <br />
        <Link className="outline rounded-md p-2" href={"/signup"}>Signup</Link>
        <Link className="outline rounded-md px-3 p-2 " href={"/signin"}>Signin</Link>
      </main>
    </div>
  );
}
