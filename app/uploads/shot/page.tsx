import LeftSide from "@/components/entities/uploader/ui/LeftSide"
import RightSide from "@/components/entities/uploader/ui/RightSide"
import UploadHeader from "@/components/entities/uploader/ui/UploadHeader"
import FinalTouchModal from "@/components/widgets/FinalTouchModal"
// import UploadBlocksMenu from "@/components/widgets/UploadModule/BlockSideMenu"
// import PrevWorks from "@/components/widgets/UploadModule/PrevWork"
import UploadBlockView from "@/components/widgets/UploadModule"
import Link from "next/link"

const UploadShotPage = () => {
    const sidesWrapper = "sticky lg:flex hidden flex-col h-full gap-2 p-4 top-4 xl:w-96 lg:w-80 md:w-72 w-64 shrink-0"
    return (
        <>
            <div className="flex flex-col items-center justify-center w-full min-h-screen gap-4 md:hidden">
                <span className="text-sm text-center text-neutral-300">Конструктор недоступен на мобильных устройствах</span>
                <Link href='/' className="px-4 py-2 text-sm text-black bg-white rounded-lg">Вернуться</Link>
            </div>
            <section className='relative flex-col hidden w-full min-h-screen md:flex shrink-0 bg-neutral-950'>
                <FinalTouchModal />
                <UploadHeader />
                <div className="flex w-full h-full">
                    <div className={sidesWrapper}>
                        <LeftSide />
                    </div>
                    <UploadBlockView />
                    <div className={sidesWrapper}>
                        <RightSide />
                    </div>
                </div>
            </section>
        </>
    )
}

export default UploadShotPage