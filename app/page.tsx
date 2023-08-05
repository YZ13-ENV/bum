import BodyWrapper from "@/components/widgets/BodyWrapper";
import Tabs from "@/components/widgets/Tabs";
import { getHost } from "@/helpers/getHost";
import { DocShotData } from "@/types";
import { chunk } from "lodash";

const getAllShots = async() => {
  try {
    const res = await fetch(`${getHost()}/api/shots/allShots`, {
      method: "GET",
    })
    const allShots: DocShotData[] = await res.json()
    return chunk(allShots, 4)
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
