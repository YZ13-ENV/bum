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
    <section id='promo-section' className="relative flex flex-col items-center justify-start w-full h-full md:gap-12 md:py-12 gap-6 py-6 shot_wrapper">
      <div className="absolute top-0 left-0 z-[-1] flex items-center justify-between w-full h-screen -translate-y-32">
        <div className="relative w-1/2 h-full md:w-1/4">
          <Image src='/left-gradient.webp' fill alt='gradient' />
        </div>
        <div className="relative w-1/2 h-full md:w-1/4">
          <Image src='/right-gradient.webp' fill alt='gradient' />
        </div>
      </div>
      <div className="w-fit h-fit flex flex-col md:my-12 my-6 items-center justify-center gap-8">
        <div className="w-full h-fit flex flex-col gap-4 items-center justify-center">
          <h1 className="text-center font-semibold text-6xl text-neutral-200">За руку по миру дизайна</h1>
          <p className=" text-neutral-400">Место для встречи идей и открытий</p>
        </div>
        {/* <div className="flex items-center gap-3">
          <Image src='/bum.svg' width={64} height={64} alt='bum-logo' />
          <span className="text-5xl font-medium text-neutral-200">bum</span>
        </div> */}


        <Space direction="horizontal" size='middle'>
          <Button size='large' href='/shots'>К работам</Button>
          <Button size='large' type='primary' href="https://auth.darkmaterial.space?back_url=https://bum.darkmaterial.space">Войти в аккаунт</Button>
        </Space>
      </div>
      <AppPreviewBlock />
    </section>
  );
}