import { getHost } from "@/helpers/getHost"
import { ShotData, DocShotData, ShortUserData } from "@/types"
import { db } from "@/utils/app"
import { collectionGroup, getDocs } from "firebase/firestore"

export const getAllShot = async() => {
    const collRef = collectionGroup(db, 'shots')
    const snaps = await getDocs(collRef)
    const convertedSnaps = snaps.docs.map(snap => ({ ...snap.data() as ShotData, doc_id: snap.id } as DocShotData))
    return convertedSnaps
}
export const getUser = async(userId: string) => {
    try {
        const userRes = await fetch(`${getHost()}/users/shortData?userId=${userId}`, { method: 'GET', next: { revalidate: 3600 } })
        const user: { short: ShortUserData } | null = await userRes.json()
        if (!user) {
            const userRes = await fetch(`${getHost()}/users/shortData?userId=${userId}`, { method: 'GET', cache: 'no-store' })
            const user: { short: ShortUserData } | null = await userRes.json()
            return user ? user.short : null
        } else return user ? user.short : null
    } catch(e) {
        return null
    }
}
export const getShot = async(shotId: string) => {
    try {
        const shotRes = await fetch(`${getHost()}/shots/shot/${shotId}`, { method: 'GET', cache: 'no-store' })
        const shot: DocShotData = await shotRes.json()
        return shot
    } catch(e) {
        console.log(e)
        return null
    }
}
export const getShotsByTag = async(tag: string, order: string): Promise<DocShotData[]> => {
    try {
        const fetchUrl = `${getHost()}/tags/${tag}/${order}`
        const res = await fetch(fetchUrl, { method: 'GET', next: { revalidate: 1800 } })
        if (res.ok) {
            const shots: DocShotData[] = await res.json()
            return shots
        } else return []
    } catch(e) {
        console.log(e)
        return []
    }
}
export const getSearchedShots = async(q: string | null, order: string='popular') => {
    if (q) {
        try {
            const fetchUrl = `${getHost()}/search/query/${q.toLowerCase()}/${order}`
            const res = await fetch(fetchUrl)
            if (res.ok) {
                const shots: DocShotData[] = await res.json()
                return shots
            } else return []
        } catch(e) {
            return []
        }
    } else return []
}