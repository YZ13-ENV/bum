import ShotCard from '@/components/entities/shot'
import { DocShotData } from '@/types'

type Props = {
    shots: DocShotData[]
}
const Shots = ({ shots }: Props) => {
    return (
        <div className='grid min-h-fit home_grid gap-9'>
            {
                shots.map((shotChunk, index) => 
                    <ShotCard key={`shotChunk#${index}#shot#${index + 1}`} shot={shotChunk} />
                )
            }
        </div>
    )
}

export default Shots