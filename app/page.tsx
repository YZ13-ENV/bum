import Footer from "@/components/shared/Footer";
import FirstView from "@/components/widgets/(HomePagePromo)/FirstView";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Home() {
  const takenCookies = cookies()
  const uid = takenCookies.get('uid')
  if (uid && !(process.env.NODE_ENV === 'development')) redirect('/shots/popular')
  return (
    <section id='promo-section' className="relative flex flex-col items-center justify-start w-full gap-6 pt-6 h-fit md:gap-12 md:pt-12">
      <div className="absolute top-0 left-0 z-[-1] flex items-center justify-between w-full h-screen -translate-y-32">
        <div className="relative w-1/2 h-full md:w-1/4">
          <Image src='/left-gradient.webp' fill alt='gradient' />
        </div>
        <div className="relative w-1/2 h-full md:w-1/4">
          <Image src='/right-gradient.webp' fill alt='gradient' />
        </div>
      </div>
      <FirstView />
      <div className="flex flex-col w-full gap-4 my-6 h-fit shrink-0 md:my-12">
        <div className="w-full max-w-5xl mx-auto mb-4">
          <h2 className="text-3xl font-semibold text-center md:text-4xl text-neutral-200">Работы на любой вкус</h2>
        </div>
        <div className="grid w-full gap-4 px-4 mx-auto last_works_grid h-fit justify-items-center">
          <Link href='/shots/popular/animation'
          className="w-full aspect-[4/3] flex items-center cursor-pointer justify-center transition-colors text-neutral-200 hover:text-black hover:bg-white bg-neutral-900 rounded-xl">
            <span className="font-medium text-center text-inherit">Анимация</span>
          </Link>
          <Link href='/shots/popular/illustration' 
          className="w-full aspect-[4/3] flex items-center cursor-pointer justify-center transition-colors text-neutral-200 hover:text-black hover:bg-white bg-neutral-900 rounded-xl">
            <span className="font-medium text-center text-inherit">Иллюстрация</span>
          </Link>
          <Link href='/shots/popular/typography' 
          className="w-full aspect-[4/3] flex items-center cursor-pointer justify-center transition-colors text-neutral-200 hover:text-black hover:bg-white bg-neutral-900 rounded-xl">
            <span className="font-medium text-center text-inherit">Типография</span>
          </Link>
          <Link href='/shots/popular/product_design' 
          className="w-full aspect-[4/3] flex items-center cursor-pointer justify-center transition-colors text-neutral-200 hover:text-black hover:bg-white bg-neutral-900 rounded-xl">
            <span className="font-medium text-center text-inherit">Дизайн продукта</span>
          </Link>
          <Link href='/shots/popular/web' 
          className="w-full aspect-[4/3] flex items-center cursor-pointer justify-center transition-colors text-neutral-200 hover:text-black hover:bg-white bg-neutral-900 rounded-xl">
            <span className="font-medium text-center text-inherit">Веб дизайн</span>
          </Link>
          <Link href='/shots/popular/mobile' 
          className="w-full aspect-[4/3] flex items-center cursor-pointer justify-center transition-colors text-neutral-200 hover:text-black hover:bg-white bg-neutral-900 rounded-xl">
            <span className="font-medium text-center text-inherit">Мобильный дизайн</span>
          </Link>
        </div>
      </div>
      <Footer />
    </section>
  );
}
