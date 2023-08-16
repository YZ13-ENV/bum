import { RcFile } from "antd/es/upload";
import { fileSizeAndType } from "./checkFile";
import { Thumbnail } from "@/types";
import { getStorageHost } from "./getHost";

export const uploadMediaThumbnail = async(userId: string, draftId: string, file: RcFile) => {
    const formData = new FormData()
    const fileType = fileSizeAndType(file)
    console.log(fileType)
    if (fileType && fileType !== 'mp4') {
        try {
            formData.append('file', file)
            const thumbnailRes = await fetch(`${getStorageHost()}/files/uploadThumbnail?uid=${userId}&draftId=${draftId}`, {
                method: 'POST',
                body: formData
            })
            const thumbnail: Thumbnail = await thumbnailRes.json()
            console.log(thumbnail)
            return thumbnail
        } catch(e) {
            console.log(e)
            return null
        }
    } else return null
}

export const uploadMedia = async(userId: string, draftId: string, file: RcFile) => {
    const formData = new FormData()
    const fileType = fileSizeAndType(file)
    console.log(fileType)
    if (fileType) {
        try {
            formData.append('file', file)
            const uploadedRes = await fetch(`${getStorageHost()}/files/uploadMediaInDraft?uid=${userId}&draftId=${draftId}`, {
                method: 'POST',
                body: formData
            })
            const uploadedFile: string | null = await uploadedRes.json()
            console.log(uploadedFile)
            return uploadedFile
        } catch(e) {
            console.log(e)
            return null
        }
    } else return null
}