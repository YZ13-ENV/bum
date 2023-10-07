import { Switch } from 'antd'
import React from 'react'

type Props = {
    turnAmbient: boolean
    setTurnAmbient: React.Dispatch<React.SetStateAction<boolean>>
}
const AmbientSwitcher = ({ setTurnAmbient, turnAmbient }: Props) => {
    return (
        <div className="absolute right-0 z-10 flex items-center gap-2 -top-8">
            { !turnAmbient && <span className='text-sm text-neutral-300'>Добавьте яркости</span> }
            <Switch checked={turnAmbient} onClick={e => setTurnAmbient(e)} />
        </div>
    )
}

export default AmbientSwitcher