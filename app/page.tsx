import BodyWrapper from "@/components/widgets/BodyWrapper";
import Tabs from "@/components/widgets/Tabs";
import { getHost } from "@/helpers/getHost";
import { DocShotData } from "@/types";
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
    <main className="flex flex-col w-full min-h-full h-fit">
      <Tabs />
      <BodyWrapper shots={shots} />
    </main>
  );
}
