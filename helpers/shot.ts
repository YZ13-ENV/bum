import { ShotData, ShotForUpload } from "@/types"
import { getHost } from "./getHost"

export const isShotExist = async(userId: string, shotId: string): Promise<boolean> => {
    const res = await fetch(`/api/shots/shotExisting?userId=${userId}&shotId=${shotId}`)
    const isExist = await res.text()
    return isExist === 'false' ? false : true
}

export const uploadShot_POST = async(userId: string, shotId: string, shot: ShotForUpload) => {
    const headers = new Headers()
    headers.set("Content-Type", "application/json")
    const res = await fetch(`${getHost()}/shots/updateDraft?userId=${userId}&draftId=${shotId}`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(shot)
    })
    const uploadedShot = await res.json()
    return uploadedShot
}

export const uploadDraft_POST = async(userId: string, draftId: string, draft: ShotData) => {
    try {
        const headers = new Headers()
        headers.set("Content-Type", "application/json")
        const res = await fetch(`${getHost()}/shots/publishDraft?userId=${userId}&draftId=${draftId}`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(draft)
        })
        return res.ok
    } catch(e) {
        console.log(e)
        return false
    }
}