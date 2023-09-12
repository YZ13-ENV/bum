import Chunker from "@/components/widgets/ChunkModule/Chunker";
import NoUserBanner from "@/components/widgets/NoUserBanner";
import { Tabs } from "antd";

type Props = {
  searchParams: {
    order: string
  }
}
export default async function Home({ searchParams }: Props) {
  return (
    <>
    <NoUserBanner />
    <main className='flex flex-col w-full h-full p-4 md:py-4 md:px-12'>
      <Tabs />
      <Chunker order={searchParams.order} />
    </main>
    </>
  );
}