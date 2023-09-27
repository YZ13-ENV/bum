import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Home() {
  const takenCookies = cookies()
  const uid = takenCookies.get('uid')
  if (uid) redirect('/shots')
  return (
    <>
    Тут надо больше рассказать о bum
    </>
  );
}