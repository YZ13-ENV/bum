import BodyWrapper from "@/components/widgets/BodyWrapper";
import Tabs from "@/components/widgets/Tabs";
import { getHost } from "@/helpers/getHost";
import { DocShotData } from "@/types";
import { cookies } from "next/headers";

const getAllShots = async(order: string | null) => {
  if (!order) return []
  try {
    // fetch (`${process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : getHost()}/api/revalidate?path=/}`)
    const cookie = cookies()
    const uidCookie = cookie.get('uid')
    const uid = uidCookie ? uidCookie.value : null
    const res = await fetch(`${getHost()}/shots/v2/allShots/${order === 'following' ? `${order}?userId=${uid}` : order}`, {
      method: "GET",
      cache: 'no-cache'
    })
    const allShots: DocShotData[] = await res.json()
    // console.log(allShots)
    return (allShots)
  } catch(e) {
    console.log(e);
    return []
  }
}

type Props = {
  searchParams: {
    order: string
  }
}
export default async function Home({ searchParams }: Props) {
  const shots = await getAllShots(searchParams.order)
  return (
    <main className='flex flex-col w-full h-full p-4 md:py-4 md:px-12'>
      <Tabs />
      <BodyWrapper shots={shots} />
    </main>
  );
}
