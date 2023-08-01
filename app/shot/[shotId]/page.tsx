import React from 'react'
type Props = {
    params: {
        shotId: string
    }
}
const ShotPage = ({ params }: Props) => {
    return (
        <div className='p-2'>{params.shotId}</div>
    )
}

export default ShotPage