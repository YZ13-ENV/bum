import { RcFile } from "antd/es/upload";
import { fileSizeAndType } from "./checkFile";
import { Thumbnail } from "@/types";
import { getStorageHost } from "./getHost";

export const uploadMediaThumbnail = async(userId: string, draftId: string, file: RcFile) => {
    const formData = new FormData()
    const fileType = fileSizeAndType(file)
    // console.log(fileType)
    if (fileType && fileType !== 'mp4') {
        try {
            formData.append('file', file)
            const thumbnailRes = await fetch(`${getStorageHost()}/files/uploadThumbnail?userId=${userId}&draftId=${draftId}`, {
                method: 'POST',
                body: formData
            })
            if (thumbnailRes.ok) {
                const thumbnail: Thumbnail = await thumbnailRes.json()
                return thumbnail
            }
            // console.log(thumbnail)
            return null
        } catch(e) {
            console.log(e)
            return null
        }
    } else return null
}

export const uploadMediaThumbnailForVideo = async(path: string) => {
    try {
        const thumbnailRes = await fetch(`${getStorageHost()}/files/uploadThumbnailForVideo?path=${path}`, {
            method: 'POST'
        })
        if (thumbnailRes.ok) {
            const thumbnail: Thumbnail = await thumbnailRes.json()
            return thumbnail
        } else return null
    } catch(e) {
        console.log(e)
        return null
    }
}

export const uploadMedia = async(userId: string, draftId: string, file: RcFile) => {
    const formData = new FormData()
    const fileType = fileSizeAndType(file)
    // console.log(fileType)
    if (fileType) {
        try {
            formData.append('file', file)
            const uploadedRes = await fetch(`${getStorageHost()}/files/file?userId=${userId}&draftId=${draftId}`, {
                method: 'POST',
                body: formData
            })
            if (uploadedRes.ok) {
                const uploadedFile: string | null = await uploadedRes.json()
                return uploadedFile
            }
            return null
            // console.log(uploadedFile)
        } catch(e) {
            console.log(e)
            return null
        }
    } else return null
}