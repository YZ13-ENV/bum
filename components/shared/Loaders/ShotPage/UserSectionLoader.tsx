const UserSectionLoader = () => {
    return (
        <div className="flex items-center justify-between w-full max-w-2xl gap-1 mx-auto h-fit">
            <div className="flex items-center w-full gap-4 h-fit">
                <div className="rounded-full w-14 h-14 shrink-0 bg-neutral-900"></div>
                <div className="flex flex-col w-full h-full gap-1">
                    <span className='w-1/2 h-5 rounded-full bg-neutral-900'/>
                    <span className='w-1/3 h-4 rounded-full bg-neutral-900'/>
                </div>
            </div>
            <div className="flex items-center gap-2 w-fit h-fit">
                <div className="w-10 h-10 rounded-xl bg-neutral-900"></div>
                <div className="w-10 h-10 rounded-xl bg-neutral-900"></div>
            </div>
        </div>
    )
}

export default UserSectionLoader