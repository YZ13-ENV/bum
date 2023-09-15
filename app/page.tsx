import Chunker from "@/components/widgets/ChunkModule/Chunker";
import NoUserBanner from "@/components/widgets/NoUserBanner";
import Tabs from "@/components/widgets/Tabs";

type Props = {
  searchParams: {
    order: string
  }
}
export default async function Home({ searchParams }: Props) {
  return (
    <>
    <NoUserBanner />
    <main className='flex flex-col w-full h-full px-4 md:px-12'>
      <Tabs />
      <Chunker order={searchParams.order} />
    </main>
    </>
  );
}