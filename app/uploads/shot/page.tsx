import LeftSide from "@/components/entities/uploader/ui/LeftSide"
import RightSide from "@/components/entities/uploader/ui/RightSide"
import UploadHeader from "@/components/entities/uploader/ui/UploadHeader"
import FinalTouchModal from "@/components/widgets/FinalTouchModal"
// import UploadBlocksMenu from "@/components/widgets/UploadModule/BlockSideMenu"
// import PrevWorks from "@/components/widgets/UploadModule/PrevWork"
import UploadBlockView from "@/components/widgets/UploadModule"

const UploadShotPage = () => {
    return (
        <section className='flex flex-col w-full min-h-screen shrink-0 bg-neutral-950'>
            <FinalTouchModal />
            <UploadHeader />
            <div className="flex w-full h-full">
                <div className="sticky flex flex-col h-full gap-2 p-4 top-4 w-96 shrink-0">
                    <LeftSide />
                </div>
                <UploadBlockView />
                <div className="sticky flex flex-col h-full gap-2 p-4 top-4 w-96 shrink-0">
                    <RightSide />
                </div>
            </div>
        </section>
    )
}

export default UploadShotPage