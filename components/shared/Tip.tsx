import { BiInfoCircle } from 'react-icons/bi'

type Props = {
    text: string
}
const Tip = ({ text }: Props) => {
    return (
        <div className="flex items-center w-full gap-2 h-fit">
            <BiInfoCircle size={16} className='shrink-0' />
            <span className='text-xs text-neutral-300'>{text}</span>
        </div>
    )
}

export default Tip