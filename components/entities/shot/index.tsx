import React from 'react'
import ShotInfo from './ui/ShotInfo'

const ShotCard = () => {
    return (
        <div className="relative w-full h-full overflow-hidden border rounded-2xl border-neutral-700 group bg-neutral-900">
            <ShotInfo />
        </div>
    )
}

export default ShotCard