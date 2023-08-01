'use client'
import AppHeader from "@/components/widgets/AppHeader";
import BodyWrapper from "@/components/widgets/BodyWrapper";
import Tabs from "@/components/widgets/Tabs";
export default function Home() {

  return (
    <main className="flex flex-col justify-between w-full h-full">
      <AppHeader />
      <Tabs />
      <BodyWrapper />
    </main>
  );
}
