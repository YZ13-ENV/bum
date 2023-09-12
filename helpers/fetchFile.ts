import { getStorageHost } from "./getHost"

export const fetchFile = (link: string): string => {
    const stableLink = link.charAt(0) === '/' ? link.substring(1) : link
    const fetchUrl = `https://cdn.darkmaterial.space/${stableLink}`
    if (process.env.NODE_ENV === 'development') return link
    return fetchUrl
}

export const testedFetch = async(url: string) => {
    const stableLink = url.charAt(0) === '/' ? url.substring(1) : url
    const fetchUrl = `${getStorageHost()}/files/file?link=${stableLink}`
    const res = await fetch(fetchUrl)
    if (res.ok) {
        const data = await res.blob()
        if (data.type.includes('image') || data.type.includes('video')) {
            const blobUrl = URL.createObjectURL(data)
            console.log(blobUrl)
            return blobUrl
        }
    }
    return ''
}