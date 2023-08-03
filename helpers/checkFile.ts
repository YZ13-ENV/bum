import { RcFile } from "antd/es/upload";
import { v4 } from "uuid";
// "image/jpeg" || "image/png"
export const checkFile = (userId: string, draftId: string, file: RcFile) => {
    if (file.type === 'image/jpg') {
        return `/users/${userId}/${draftId}/${v4()}.jpg`
    } else if (file.type === 'image/png') {
        return `/users/${userId}/${draftId}/${v4()}.png`
    }
    return null
}