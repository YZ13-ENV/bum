import { DraftShotData, ImageBlock, ShotData, ShotForUpload } from "@/types"
import { DateTime } from "luxon"
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

export const uploadDraft_POST = async(userId: string, draftId: string, draft: ShotData, needFeedBack: boolean, tags: string[], thumbnail: ShotData['thumbnail']=null) => {
    try {
        const headers = new Headers()
        headers.set("Content-Type", "application/json")
        const preparedDraft = {
            ...draft,
            tags: tags,
            thumbnail: thumbnail,
            needFeedBack: needFeedBack
        }
        const res = await fetch(`${getHost()}/shots/publishDraft?userId=${userId}&draftId=${draftId}`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(preparedDraft)
        })
        const uploadedShot = await res.json()
        return uploadedShot
    } catch(e) {
        console.log(e)
        return null
    }
}

const uploadShotWithCheck = async(userId: string, shotId: string, shot: ShotForUpload) => {
    const isExist = await isShotExist(userId, shotId)
    // console.log(isExist);
    if (!isExist) {
        const uploadedShot = await uploadShot_POST(userId, shotId, shot)
        return uploadedShot
    }
    return null
}

const uploadDraft = async(userId: string, draftId: string, draft: ShotData) => {

}