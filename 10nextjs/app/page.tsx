import Image from "next/image";
  // const movieData = await axios.get(
  //                   "https://api.themoviedb.org/3/discover/movie?api_key=6968c9bbcd3243554cd73ae3a7d0bf75"
  //               );
export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
      </main>
    </div>
  );
}
