import BodyWrapper from "@/components/widgets/BodyWrapper";
import Tabs from "@/components/widgets/Tabs";
import { ShotData } from "@/types";
import { flatten } from "lodash";

const getAllShots = async() => {
  try {
    const res = await fetch('/api/shots/allShots')
    const allShots: ShotData[] = await res.json()
    return flatten(allShots)
  } catch(e) {
    return []
  }
}
export default async function Home() {
  const shots = await getAllShots()
  console.log(shots);
  return (
    <main className="flex flex-col justify-between w-full h-full">
      <Tabs />
      <BodyWrapper shots={shots} />
    </main>
  );
}
