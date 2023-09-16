type Props = {
    children: React.ReactNode
}
const ModalWrapper = ({ children }: Props) => {
    return (
        <section className='fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-70'>{children}</section>
    )
}

export default ModalWrapper