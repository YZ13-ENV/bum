import { ImageBlock, VideoBlock } from "@/types";
import { RcFile } from "antd/es/upload";
import { v4 } from "uuid";
// "image/jpeg" || "image/png" || "video/mp4"
export const checkFile = (
    userId: string, draftId: string, file: RcFile
    ): ImageBlock | VideoBlock | null => {
    const checkedSize = checkSize(file.size)
    if (file.type === 'video/mp4' && 
    (checkedSize.size <= 20 && checkedSize.scale === 'MiB' || checkedSize.scale === 'KiB' || checkedSize.scale === 'Bytes')) {
        return { type: 'video', link: `/users/${userId}/${draftId}/${v4()}.mp4`}
    }
    if (file.type.includes('image') && (checkedSize.size <= 10 && checkedSize.scale === 'MiB' || checkedSize.scale === 'KiB' || checkedSize.scale === 'Bytes')) {
        if (file.type === 'image/jpg') {
            return { type: 'image', link: `/users/${userId}/${draftId}/${v4()}.jpg`}
        } else if (file.type === 'image/png') {
            return { type: 'image', link: `/users/${userId}/${draftId}/${v4()}.png`}
        } else if (file.type === 'image/gif') {
            return { type: 'image', link: `/users/${userId}/${draftId}/${v4()}.gif`}
        } else return null
    }
    return null
}

export const checkOnlyImageFile = (
    userId: string, draftId: string, file: RcFile
    ): ImageBlock | null => {
    const checkedSize = checkSize(file.size)
    if (file.type.includes('image') && (checkedSize.size <= 10 && checkedSize.scale === 'MiB' || checkedSize.scale === 'KiB' || checkedSize.scale === 'Bytes')) {
        if (file.type === 'image/jpg') {
            return { type: 'image', link: `/users/${userId}/${draftId}/${v4()}.jpg`}
        } else if (file.type === 'image/png') {
            return { type: 'image', link: `/users/${userId}/${draftId}/${v4()}.png`}
        } else if (file.type === 'image/gif') {
            return { type: 'image', link: `/users/${userId}/${draftId}/${v4()}.gif`}
        } else return null
    }
    return null
}

const checkSize = (bytes: number, decimals: number = 2) => {
    if (!+bytes) return { size: 0, scale: 'Bytes'}
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return { size: parseFloat((bytes / Math.pow(k, i)).toFixed(dm)), scale: sizes[i]}
}