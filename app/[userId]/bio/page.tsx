import { Button, Select } from "antd"

const UserBio = () => {
    return (
        <section className='flex flex-col w-full h-full max-w-5xl gap-4 mx-auto overflow-y-auto md:flex-row'>
            <div className="flex flex-col w-full h-full gap-2 md:w-2/3">
                <div className="flex flex-col w-full gap-2 h-fit">
                    <span className="font-medium text-neutral-200">Обо мне</span>
                    <div className="w-full h-32 bg-black border border-neutral-700 rounded-xl" />
                </div>
                <div className="flex flex-col w-full gap-2 h-fit">
                    <span className="font-medium text-neutral-200">Навыки</span>
                    <Select mode="tags" />
                </div>
            </div>
            <div className="flex flex-col w-full h-full md:w-1/3">
                <div className="flex flex-col w-full gap-2 h-fit">
                    <span className="font-medium text-neutral-200">Соц. сети</span>
                    <Button block>Добавить</Button>
                </div>
            </div>
        </section>
    )
}

export default UserBio