import { getStorageHost } from "./getHost"

export const fetchFile = (link: string): string => {
    const stableLink = link.charAt(0) === '/' ? link.substring(1) : link
    const fetchUrl = `${getStorageHost()}/files/file?link=${stableLink}`
    // console.log(fetchUrl)
    return fetchUrl
}