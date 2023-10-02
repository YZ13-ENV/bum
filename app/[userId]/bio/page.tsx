import Bio from "@/components/widgets/Bio"
import { cookies } from 'next/headers'

type Props = {
    params: {
        userId: string
    }
}
const UserBio = ({ params }: Props) => {
    const cookiesList = cookies()
    const uid = cookiesList.get('uid')
    return (
        <section className='flex flex-col w-full h-full max-w-5xl gap-4 mx-auto overflow-y-auto md:flex-row'>
            <Bio preparedValue={uid?.value ? uid.value === params.userId : false} />
        </section>
    )
}

export default UserBio