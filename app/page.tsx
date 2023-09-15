import Chunker from "@/components/widgets/ChunkModule/Chunker";
import NoUserBanner from "@/components/widgets/NoUserBanner";
import Tabs from "@/components/widgets/Tabs";
import { Suspense } from "react";
import { BiLoaderAlt } from "react-icons/bi";

type Props = {
  searchParams: {
    order: string
  }
}
export default function Home({ searchParams }: Props) {
  return (
    <>
      <NoUserBanner />
      <section className='flex flex-col w-full h-full px-4 md:px-12'>
        <Tabs />
        <Suspense fallback={<div className="flex items-center justify-center w-full h-full"><BiLoaderAlt size={17} className="animate-spin" /></div>}>
          <Chunker order={searchParams.order} />
        </Suspense>
      </section>
    </>
  );
}