const Loading = () => {
    return (
        <div className='flex flex-col w-full h-full gap-4 p-4 md:py-4 md:px-12'>
            <div className="flex justify-between w-full gap-4 py-4 shrink-0 md:gap-12 h-fit">
                <div className="w-20 h-8 rounded-xl bg-neutral-800 animate-pulse" />
                <div className="w-20 h-8 rounded-xl bg-neutral-800 animate-pulse" />
            </div>
            <div className='grid min-h-fit home_grid gap-9'>
                <div className="w-full h-full rounded-xl bg-neutral-800 animate-pulse"/>
                <div className="w-full h-full rounded-xl bg-neutral-800 animate-pulse"/>
                <div className="w-full h-full rounded-xl bg-neutral-800 animate-pulse"/>
                <div className="w-full h-full rounded-xl bg-neutral-800 animate-pulse"/>
            </div>
        </div>
    )
}

export default Loading