import Footer from "@/components/shared/Footer";
import AppPreviewBlock from "@/components/widgets/AppPreviewBlock";
import { Button, Space } from "antd";
import { cookies } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";

export default function Home() {
  const takenCookies = cookies()
  const uid = takenCookies.get('uid')
  if (uid && !(process.env.NODE_ENV === 'development')) redirect('/shots')
  return (
    <section id='promo-section' className="relative flex flex-col items-center justify-start w-full h-full gap-6 pt-6 md:gap-12 md:pt-12 shot_wrapper">
      <div className="absolute top-0 left-0 z-[-1] flex items-center justify-between w-full h-screen -translate-y-32">
        <div className="relative w-1/2 h-full md:w-1/4">
          <Image src='/left-gradient.webp' fill alt='gradient' />
        </div>
        <div className="relative w-1/2 h-full md:w-1/4">
          <Image src='/right-gradient.webp' fill alt='gradient' />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-8 my-6 md:my-24 w-fit h-fit">
        <div className="flex flex-col items-center justify-center w-full gap-4 h-fit">
          <h1 className="text-6xl font-semibold text-center text-neutral-200">За руку по миру дизайна</h1>
          <p className=" text-neutral-400">Место для встречи идей и открытий</p>
        </div>
        <Space direction="horizontal" size='middle'>
          <Button size='large' href='/shots'>К работам</Button>
          <Button size='large' type='primary' href="https://auth.darkmaterial.space?back_url=https://bum.darkmaterial.space">Войти в аккаунт</Button>
        </Space>
      </div>
      <AppPreviewBlock />
      {/* <div className="flex flex-col w-full max-w-5xl gap-6 my-6 h-fit shrink-0 md:my-12">
        <div className="flex items-center w-full gap-6 h-fit">
          <Image src='/bum.svg' width={48} height={48} alt='bum-logo' />
          <h2 className="text-4xl font-semibold text-neutral-200">Адаптивная подсветка</h2>
        </div>
        <span className="text-neutral-400">Благодаря AmbientLight ваши работы будут выглядеть ещё лучше и красивее*.</span>
        <div className="w-full mx-auto ">
          <Image src='/AmbientLight_preview.png' className="!relative rounded-xl" fill alt='ambientlight-preview' />
        </div>
        <span className="text-sm text-neutral-400">*- AmbientLight доступна обладателям DM+.</span>
      </div> */}
      <div className="flex flex-col w-full gap-4 my-6 h-fit shrink-0 md:my-12">
        <div className="w-full max-w-5xl mx-auto mb-4">
          <h2 className="text-3xl font-semibold text-center md:text-4xl text-neutral-200">Работы на любой вкус</h2>
        </div>
        <div className="grid w-full gap-4 px-4 mx-auto last_works_grid h-fit justify-items-center">
          <div className="w-full aspect-[4/3] flex items-center cursor-pointer justify-center transition-colors text-neutral-200 hover:text-black hover:bg-white bg-neutral-900 rounded-xl">
            <span className="font-medium text-center text-inherit">Анимация</span>
          </div>
          <div className="w-full aspect-[4/3] flex items-center cursor-pointer justify-center transition-colors text-neutral-200 hover:text-black hover:bg-white bg-neutral-900 rounded-xl">
            <span className="font-medium text-center text-inherit">Иллюстрация</span>
          </div>
          <div className="w-full aspect-[4/3] flex items-center cursor-pointer justify-center transition-colors text-neutral-200 hover:text-black hover:bg-white bg-neutral-900 rounded-xl">
            <span className="font-medium text-center text-inherit">Типография</span>
          </div>
          <div className="w-full aspect-[4/3] flex items-center cursor-pointer justify-center transition-colors text-neutral-200 hover:text-black hover:bg-white bg-neutral-900 rounded-xl">
            <span className="font-medium text-center text-inherit">Дизайн продукта</span>
          </div>
          <div className="w-full aspect-[4/3] flex items-center cursor-pointer justify-center transition-colors text-neutral-200 hover:text-black hover:bg-white bg-neutral-900 rounded-xl">
            <span className="font-medium text-center text-inherit">Веб дизайн</span>
          </div>
          <div className="w-full aspect-[4/3] flex items-center cursor-pointer justify-center transition-colors text-neutral-200 hover:text-black hover:bg-white bg-neutral-900 rounded-xl">
            <span className="font-medium text-center text-inherit">Мобильный дизайн</span>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
}