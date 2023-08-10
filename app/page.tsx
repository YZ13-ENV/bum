const BodyWrapper = dynamic(() => import("@/components/widgets/BodyWrapper"), {
  loading: () => <div className="w-full h-full rounded-xl bg-neutral-900 animate-pulse" />
});
import Tabs from "@/components/widgets/Tabs";
import { getHost } from "@/helpers/getHost";
import { DocShotData } from "@/types";
import dynamic from "next/dynamic";


const getAllShots = async() => {
  try {
    await fetch (`${process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : getHost()}/api/revalidate?path=/}`)
    const res = await fetch(`${getHost()}/shots/allShots`, {
      method: "GET",
      cache: 'force-cache'
    })
    const allShots: DocShotData[] = await res.json()
    return (allShots)
  } catch(e) {
    console.log(e);
    return []
  }
}
export default async function Home() {
  const shots = await getAllShots()
  return (
    <main className="flex flex-col justify-between w-full h-full">
      <Tabs />
      <BodyWrapper shots={shots} />
    </main>
  );
}
