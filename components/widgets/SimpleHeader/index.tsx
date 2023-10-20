import UserStatus from '@/components/entities/user'
import { Button } from 'antd'
import { BiLeftArrowAlt } from 'react-icons/bi'

const SimpleHeader = () => {
    return (
        <header className="flex items-center justify-between w-full h-fit">
            <Button href='/shots/popular' type='text' size='large' icon={<BiLeftArrowAlt size={17} className='inline-block mb-0.5' />}>Вернуться</Button>
            <UserStatus />
        </header>
    )
}

export default SimpleHeader