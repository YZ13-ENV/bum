import { cookies } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";

export default function Home() {
  const takenCookies = cookies()
  const uid = takenCookies.get('uid')
  if (uid && !(process.env.NODE_ENV === 'development')) redirect('/shots')
  return (
    <section className="relative flex flex-col items-center justify-center w-full h-full gap-4 shot_wrapper">
      <div className="absolute top-0 left-0 z-0 flex items-center justify-between w-full h-screen -translate-y-32">
        <div className="relative w-1/2 h-full md:w-1/4">
          <Image src='/left-gradient.webp' fill alt='gradient' />
        </div>
        <div className="relative w-1/2 h-full md:w-1/4">
          <Image src='/right-gradient.webp' fill alt='gradient' />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Image src='/bum.svg' width={64} height={64} alt='bum-logo' />
        <span className="text-5xl font-medium text-neutral-200">bum</span>
      </div>

      <p className=" text-neutral-400">За руку по миру дизайна</p>

    </section>
  );
}