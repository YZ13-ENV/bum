import { BsDot, BsMagic } from 'react-icons/bs'
import { MdFiberNew } from 'react-icons/md'
import { PiVideo } from 'react-icons/pi'
import { RiVerifiedBadgeFill } from 'react-icons/ri'
import PricingColumn from './PricingColumn'

type Props = {
    forYear: boolean
}
const PricingPool = ({ forYear }: Props) => {
    return (
        <div className="flex flex-col items-center justify-center w-full gap-8 md:flex-row h-fit">
            <PricingColumn title='Стандарт' buttonContent={<span className='text-sm'>Бесплатно</span>}>
                <li className='my-2 list-none'>
                    <div className="flex items-center w-full gap-2 h-fit">
                        <BsDot size={21} className='shrink-0' />
                        <span className='text-sm text-neutral-300'>Возможность загружать видео только в главный блок</span>
                    </div>
                </li>
                <li className='my-2 list-none'>
                    <div className="flex items-center w-full gap-2 h-fit">
                        <BsDot size={21} className='shrink-0' />
                        <span className='text-sm text-neutral-300'>Стандартный вид иконки</span>
                    </div>
                </li>
                <li className='my-2 list-none'>
                    <div className="flex items-center w-full gap-2 h-fit">
                        <BsDot size={21} className='shrink-0' />
                        <span className='text-sm text-neutral-300'>Новые функции в крупных обновлениях</span>
                    </div>
                </li>
            </PricingColumn>
            <PricingColumn title='DM+' isSelected buttonContent={
                <span className='!inline-flex flex-col items-center justify-center w-full h-full'>
                    <span className='text-sm'>Подключить за {forYear ? 109 : 199}p в месяц</span>
                    { forYear && <span className='text-xs text-blue-200'>При оплате за год</span> }
                </span>
            }>
                <li className='my-2 list-none'>
                    <div className="flex items-center w-full gap-3 h-fit">
                        <PiVideo size={21} className='shrink-0' />
                        <span className='text-sm text-neutral-300'>Возможность загружать видео в каждый медиа-блок</span>
                    </div>
                </li>
                <li className='my-2 list-none'>
                    <div className="flex items-center w-full gap-3 h-fit">
                        <BsMagic size={21} />
                        <span className='text-sm text-neutral-300'>Ambient подсветка для главного блока</span>
                    </div>
                </li>
                <li className='my-2 list-none'>
                    <div className="flex items-center w-full gap-3 h-fit">
                        <RiVerifiedBadgeFill size={21} />
                        <span className='text-sm text-neutral-300'>Уникальный вид иконки</span>
                    </div>
                </li>
                <li className='my-2 list-none'>
                    <div className="flex items-center w-full gap-3 h-fit">
                        <MdFiberNew size={21} />
                        <span className='text-sm text-neutral-300'>Попробуйте новые функции первыми</span>
                    </div>
                </li>
            </PricingColumn>
        </div>
    )
}

export default PricingPool