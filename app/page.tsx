import dynamic from "next/dynamic";
const Chunker = dynamic(() => import("@/components/widgets/Chunker"));
const NoUserBanner = dynamic(() => import("@/components/widgets/NoUserBanner"));
const Tabs = dynamic(() => import("@/components/widgets/Tabs"));

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