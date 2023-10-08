import ConstructorGallery from '@/components/widgets/(BumPlusPreviews)/ConstructorGallery'
import PreviewGallery from '@/components/widgets/(BumPlusPreviews)/PreviewGallery'
import Pricing from '@/components/widgets/(BumPlusPreviews)/Pricing'

const Membership = () => {
    return (
        <section className='flex flex-col items-center justify-start w-full max-w-6xl min-h-full px-4 mx-auto'>
            <div className="flex items-center justify-center w-full shot_wrapper">
                <h1 className='text-4xl font-bold text-center md:text-6xl lg:text-9xl text-neutral-200'>Добавьте яркости с DM+</h1>
            </div>
            <PreviewGallery />
            <div className="flex items-center justify-center w-full shot_wrapper">
                <h1 className='text-4xl font-bold text-center md:text-6xl lg:text-9xl text-neutral-200'>Расширьте возможности с DM+</h1>
            </div>
            <ConstructorGallery />
            <Pricing />
        </section>
    )
}

export default Membership
