const Loading = () => {
    return (
        <div className='flex flex-col w-full h-full'>
            <div className="flex items-center w-full gap-2 px-4 py-1 md:px-12 border-y border-neutral-700 h-fit">
                <div className="w-16 h-16 rounded-full bg-neutral-800 shrink-0 animate-pulse"/>
                <div className="flex flex-col justify-center h-full gap-2 w-fit">
                    <div className="h-6 w-36 rounded-xl bg-neutral-800 animate-pulse" />
                    <div className="w-10 h-4 rounded-xl bg-neutral-800 animate-pulse" />
                </div>
            </div>
            <div className="flex items-center justify-start w-full gap-1 px-4 py-4 md:px-12 shrink-0 h-fit">
                <div className="w-20 h-8 rounded-xl bg-neutral-800 animate-pulse" />
                <div className="w-20 h-8 rounded-xl bg-neutral-800 animate-pulse" />
                <div className="w-20 h-8 rounded-xl bg-neutral-800 animate-pulse" />
            </div>
            <div className='grid px-4 md:px-12 min-h-fit home_grid gap-9'>
                <div className="w-full h-full rounded-xl bg-neutral-800 animate-pulse"/>
                <div className="w-full h-full rounded-xl bg-neutral-800 animate-pulse"/>
                <div className="w-full h-full rounded-xl bg-neutral-800 animate-pulse"/>
                <div className="w-full h-full rounded-xl bg-neutral-800 animate-pulse"/>

                <div className="w-full h-full rounded-xl bg-neutral-800 animate-pulse"/>
                <div className="w-full h-full rounded-xl bg-neutral-800 animate-pulse"/>
                <div className="w-full h-full rounded-xl bg-neutral-800 animate-pulse"/>
                <div className="w-full h-full rounded-xl bg-neutral-800 animate-pulse"/>

                <div className="w-full h-full rounded-xl bg-neutral-800 animate-pulse"/>
                <div className="w-full h-full rounded-xl bg-neutral-800 animate-pulse"/>
                <div className="w-full h-full rounded-xl bg-neutral-800 animate-pulse"/>
                <div className="w-full h-full rounded-xl bg-neutral-800 animate-pulse"/>
            </div>
        </div>
    )
}

export default Loading