import UserSectionLoader from '@/components/shared/Loaders/ShotPage/UserSectionLoader'
const Loading = () => {
    return (
        <div className='relative flex flex-col w-full min-h-full gap-6 px-4 pb-4 md:px-0 h-fit'>
            <div className="flex flex-col w-full max-w-4xl gap-4 mx-auto h-fit shrink-0">
                <UserSectionLoader />
                <div className="w-full rounded-xl aspect-[4/3] shrink-0 bg-neutral-900 animate-pulse"></div>
                <div className="flex md:flex-row flex-col items-start w-full max-w-4xl gap-2 mx-auto h-fit min-h-[48rem]">
                    <div className="flex flex-col w-full gap-2 md:h-full h-fit md:w-8/12">
                        <div className="w-full h-24 rounded-xl bg-neutral-900 animate-pulse"></div>
                    </div>
                    <div className="flex flex-col w-full h-full gap-2 md:w-4/12">
                        <div className='grid w-full h-full grid-cols-1 grid-rows-4 gap-2'>
                            <div className="w-full h-full rounded-xl bg-neutral-900"></div>
                            <div className="w-full h-full rounded-xl bg-neutral-900"></div>
                            <div className="w-full h-full rounded-xl bg-neutral-900"></div>
                            <div className="w-full h-full rounded-xl bg-neutral-900"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Loading