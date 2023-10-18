import { getHost } from "@/helpers/getHost"
import { ShotData, DocShotData, ShortUserData } from "@/types"
import { db } from "@/utils/app"
import { collection, collectionGroup, getDocs, query, where } from "firebase/firestore"

const cacheTime = 120

export const getDrafts = async(uid: string) => {
    try {
        const ref = collection(db, 'users', uid, 'shots')
        const q = query(ref, where('isDraft', '==', true))
        const snaps = await getDocs(q)
        const shots = !snaps.empty ? snaps.docs.map(snap => ({ ...snap.data(), doc_id: snap.id }) as DocShotData ) : []
        return shots
    } catch(e) {
        console.log(e);
        return []
    }
}
export const getAllShot = async() => {
    const collRef = collectionGroup(db, 'shots')
    const snaps = await getDocs(collRef)
    const convertedSnaps = snaps.docs.map(snap => ({ ...snap.data() as ShotData, doc_id: snap.id } as DocShotData))
    return convertedSnaps
}
export const getUser = async(userId: string) => {
    try {
        const userRes = await fetch(`${getHost()}/users/shortData?userId=${userId}`, { method: 'GET', next: { revalidate: cacheTime } })
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
export const getShotsByTag = async(tag: string, order: string): Promise<DocShotData[]> => {
    try {
        const fetchUrl = `${getHost()}/tags/${tag}/${order}`
        const res = await fetch(fetchUrl, { method: 'GET', next: { revalidate: cacheTime } })
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

export const getShots = async(userId: string, tab: string | null, order?: 'popular' | 'new') => {
    const stableTab = !tab ? 1 : parseInt(tab)
    try {
        const shotsRes = await fetch(`${getHost()}/shots/${stableTab === 1 ? 'onlyShots' : 'onlyDrafts'}/${userId}${order ? `&order=${order}` :''}`, { next: { revalidate: 120 } })
        const shots: DocShotData[] = await shotsRes.json()
        return shots
    } catch(e) {
        console.log(e)
        return null
    }
}
export const getShot = async(shotId: string, userId?: string) => {
    try {
        if (userId) {
            const shotRes = await fetch(`${getHost()}/shots/shot/${shotId}/${userId}`, { method: 'GET', cache: 'no-store' })
            const shot: DocShotData = await shotRes.json()
            return shot
        } else {
            const shotRes = await fetch(`${getHost()}/shots/shot/${shotId}`, { method: 'GET', cache: 'no-store' })
            const shot: DocShotData = await shotRes.json()
            return shot
        }
    } catch(e) {
        console.log(e)
        return null
    }
}
export const getUidFromNickname = async(nickname: string) => {
    try {
        const res = await fetch(`${getHost()}/users/nickname/${nickname}`)
        if (res.ok) return await res.text()
        return null
    } catch(e) {
        console.log(e)
        return null
    }
}
export const getShotWithCache = async(userId: string, shotId: string) => {
    try {
        if (userId) {
            const shotRes = await fetch(`${getHost()}/shots/shot/${shotId}/${userId}`, { method: 'GET', next: { revalidate: 120 } })
            const shot: DocShotData = await shotRes.json()
            return shot
        } else {
            const shotRes = await fetch(`${getHost()}/shots/shot/${shotId}`, { method: 'GET', next: { revalidate: 120 } })
            const shot: DocShotData = await shotRes.json()
            return shot
        }
    } catch(e) {
        console.log(e)
        return null
    }
}
export const getShortByNickname = async(nickname: string) => {
    try {
        const userRes = await fetch(`${getHost()}/users/short/nickname/${nickname}`, { method: 'GET', next: { revalidate: 1800 } })
        const user: { short: ShortUserData } | null = await userRes.json()
        return user ? user.short : null
    } catch(e) {
        console.log(e)
        return null
    }
} 
export const getUserShort = async(userId: string) => {
    try {
        const userRes = await fetch(`${getHost()}/users/shortData?userId=${userId}`, { method: 'GET', next: { revalidate: 1800 } })
        const user: { short: ShortUserData } | null = await userRes.json()
        return user ? user.short : null
    } catch(e) {
        console.log(e)
        return null
    }

}