import { getHost } from "@/helpers/getHost"
import { DocShotData, ShortUserData } from "@/types"

export const getShots = async(userId: string, tab: string | null, order?: 'popular' | 'new') => {
    const stableTab = !tab ? 1 : parseInt(tab)
    try {
        const shotsRes = await fetch(`${getHost()}/shots/${stableTab === 1 ? 'onlyShots' : 'onlyDrafts'}/${userId}${order ? `&order=${order}` :''}`, { next: { revalidate: 3600 } })
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
            const shotRes = await fetch(`${getHost()}/shots/shot/${shotId}/${userId}`, { method: 'GET', next: { revalidate: 3600 } })
            const shot: DocShotData = await shotRes.json()
            return shot
        } else {
            const shotRes = await fetch(`${getHost()}/shots/shot/${shotId}`, { method: 'GET', next: { revalidate: 3600 } })
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
        const userRes = await fetch(`${getHost()}/users/short/nickname/${nickname}`, { method: 'GET', next: { revalidate: 3600 } })
        const user: { short: ShortUserData } | null = await userRes.json()
        return user ? user.short : null
    } catch(e) {
        console.log(e)
        return null
    }
} 
export const getUserShort = async(userId: string) => {
    try {
        const userRes = await fetch(`${getHost()}/users/shortData?userId=${userId}`, { method: 'GET', next: { revalidate: 3600 } })
        const user: { short: ShortUserData } | null = await userRes.json()
        return user ? user.short : null
    } catch(e) {
        console.log(e)
        return null
    }

}