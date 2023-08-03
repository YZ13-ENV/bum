import { ShotForUpload } from "@/types"

export const isShotExist = async(userId: string, shotId: string): Promise<boolean> => {
    const res = await fetch(`/api/shots/shotExisting?userId=${userId}&shotId=${shotId}`)
    const isExist = await res.text()
    return isExist === 'false' ? false : true
}

export const uploadShot_POST = async(userId: string, shotId: string, shot: ShotForUpload) => {
    const headers = new Headers()
    headers.set("Content-Type", "application/json")
    const res = await fetch(`/api/shots/shot?userId=${userId}&shotId=${shotId}&asDraft=True`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(shot)
    })
    const uploadedShot = await res.json()
    return uploadedShot
}

const uploadShotWithCheck = async(userId: string, shotId: string, shot: ShotForUpload) => {
    const isExist = await isShotExist(userId, shotId)
    console.log(isExist);
    if (!isExist) {
        const uploadedShot = await uploadShot_POST(userId, shotId, shot)
        console.log(uploadedShot)
        return uploadedShot
    }
    return null
}