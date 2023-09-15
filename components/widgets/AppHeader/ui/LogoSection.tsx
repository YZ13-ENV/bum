import Image from 'next/image'
import Link from 'next/link'

const LogoSection = () => {
    return (
        <Link href='/'>
            <Image src='/LogoWHandFont.svg' className='shrink-0' width={80} height={40} alt="app-logo" />
        </Link>
    )
}

export default LogoSection