import Footer from '@/components/shared/Footer'
import ConstructorGallery from '@/components/widgets/(BumPlusPreviews)/ConstructorGallery'
import PreviewGallery from '@/components/widgets/(BumPlusPreviews)/PreviewGallery'
import Pricing from '@/components/widgets/(BumPlusPreviews)/Pricing'
import SimpleHeader from '@/components/widgets/SimpleHeader'

const Membership = () => {
    return (
        <>
            <section className='flex flex-col items-center justify-start w-full max-w-6xl min-h-full p-4 mx-auto'>
                <SimpleHeader />
                <div className="flex items-center justify-center w-full px-2 shot_wrapper">
                    <h1 className='text-5xl font-bold text-center lg:text-9xl text-neutral-200'>Добавьте яркости с DM+</h1>
                </div>
                <PreviewGallery />
                <div className="flex items-center justify-center w-full px-2 shot_wrapper">
                    <h1 className='text-5xl font-bold text-center lg:text-9xl text-neutral-200'>Расширьте возможности с DM+</h1>
                </div>
                <ConstructorGallery />
                <Pricing />
            </section>
            <Footer />
        </>
    )
}

export default Membership
