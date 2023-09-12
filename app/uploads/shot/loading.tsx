const Loading = () => {
    return (
        <section className='flex flex-col w-full h-full shrink-0'>
            <div className="flex items-center justify-between w-full h-12 p-2 border-b shrink-0 border-neutral-700">
                <div className="w-24 h-full rounded-xl bg-neutral-800 animate-pulse" />
                <div className="w-24 h-full rounded-xl bg-neutral-800 animate-pulse" />
            </div>
            <div className="flex flex-col justify-center w-full h-full">
                <div className="flex flex-col w-full h-full max-w-4xl max-h-full gap-4 px-4 py-4 mx-auto overflow-y-auto md:px-0 md:py-4">
                    <div className="w-full h-8 rounded-xl bg-neutral-800 animate-pulse"></div>
                    <div className="w-full rounded-xl bg-neutral-800 animate-pulse aspect-[4/3]" />
                </div>
            </div>
        </section>
    )
}

export default Loading