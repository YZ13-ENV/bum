import dynamic from "next/dynamic";
const UploadShot = dynamic(() => import('@/components/pages/UploadShot'));
const UploadShotPage = () => {
    return (
        <UploadShot />
    )
}

export default UploadShotPage