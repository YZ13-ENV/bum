import { RcFile } from "antd/es/upload";
import { fileSizeAndType } from "./checkFile";
import { getHost } from "./getHost";

export const uploadMedia = async(userId: string, draftId: string, file: RcFile) => {
    const formData = new FormData()
    const fileType = fileSizeAndType(file)
    // console.log(fileType)
    if (fileType) {
        try {
            formData.append('file', file)
            const uploadedRes = await fetch(`${getHost()}/files/file?link=${userId}/${draftId}`, {
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

export const uploadThumbnail = async(userId: string, draftId: string, file: RcFile) => {
    const formData = new FormData()
    const fileType = fileSizeAndType(file)
    if (fileType) {
        try {
            formData.append('file', file)
            const uploadedRes = await fetch(`${getHost()}/files/thumbnail?link=${userId}/${draftId}`, {
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