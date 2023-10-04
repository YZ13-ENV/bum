// Lumos new name for project
const Loading = () => {
    return (
        <div className='relative flex flex-col w-full min-h-full gap-6 px-4 pb-4 md:px-0 h-fit'>
            <div className="flex flex-col w-full max-w-sm mx-auto gap-14 md:max-w-2xl lg:max-w-4xl h-fit shrink-0">
                <div className="w-full h-12 max-w-md mx-auto rounded-xl bg-neutral-900"></div>
                <div className="w-full rounded-xl aspect-[4/3] shrink-0 bg-neutral-900 animate-pulse"></div>
            </div>
            <div className="flex md:flex-row flex-col items-start w-full max-w-4xl gap-2 mx-auto h-fit min-h-[24rem]">
                <div className="flex flex-col w-full h-full gap-2 md:w-8/12">
                    <div className="w-full h-24 rounded-xl bg-neutral-900 animate-pulse"></div>
                </div>
                <div className="grid w-full gap-2 h-fit last_works_grid md:w-4/12">
                    <div className="w-full aspect-[4/3] rounded-xl bg-neutral-900"></div>
                    <div className="w-full aspect-[4/3] rounded-xl bg-neutral-900"></div>
                    <div className="w-full aspect-[4/3] rounded-xl bg-neutral-900"></div>
                    <div className="w-full aspect-[4/3] rounded-xl bg-neutral-900"></div>
                </div>
            </div>
        </div>
    )
}

export default Loading