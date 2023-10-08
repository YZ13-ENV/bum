import React from 'react'

type Props = {
    title: React.ReactNode
    noSub: React.ReactNode
    withSub: React.ReactNode
}
const AdvantageRow = ({ noSub, title, withSub }: Props) => {
    return (
        <tr className='w-full transition-colors cursor-pointer h-fit hover:bg-neutral-950'>
            <td className='w-full'>
                <div className="flex items-center w-full gap-2 px-2 py-1 h-fit">
                    { title }
                </div>
            </td>
            <td>{ noSub }</td>
            <td>{ withSub }</td>
        </tr>
    )
}

export default AdvantageRow