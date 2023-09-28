import { uploadMedia, uploadThumbnail } from "@/helpers/uploadMedia"
import { RcFile } from "antd/es/upload"

export const uploadedFile = (uid: string, draftId: string, file: RcFile) => new Promise<string | null>(async(res, rej) => {
    const uploadedFile = await uploadMedia(uid, draftId, file)
    res(uploadedFile)
})
export const uploadedThumbnail = (uid: string, draftId: string, file: RcFile) => new Promise<string | null>(async(res, rej) => {
    const uploadedFile = await uploadThumbnail(uid, draftId, file)
    res(uploadedFile)
})