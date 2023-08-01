'use client'
import BodyWrapper from "@/components/widgets/BodyWrapper";
import Tabs from "@/components/widgets/Tabs";
export default function Home() {

  return (
    <main className="flex flex-col justify-between w-full h-full">
      <Tabs />
      <BodyWrapper />
    </main>
  );
}
