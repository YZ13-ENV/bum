const BodyWrapper = dynamic(() => import("@/components/widgets/BodyWrapper"), {
  loading: () => <div className="w-full h-full rounded-xl bg-neutral-900 animate-pulse" />
});
import Tabs from "@/components/widgets/Tabs";
import { getHost } from "@/helpers/getHost";
import { DocShotData } from "@/types";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";


const getAllShots = async(order: string | null) => {
  if (!order) return []
  try {
    // fetch (`${process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : getHost()}/api/revalidate?path=/}`)
    const res = await fetch(`${getHost()}/shots/allShots/${order}`, {
      method: "GET",
      cache: 'no-cache'
    })
    const allShots: DocShotData[] = await res.json()
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
  if (!searchParams.order) redirect('/?order=popular')
  return (
    <main className="flex flex-col justify-between w-full h-full">
      <Tabs />
      <BodyWrapper shots={shots} />
    </main>
  );
}
