import { getStorageHost } from "./getHost"

export const fetchFile = async(link: string): Promise<string | null> => {
    const stableLink = link.charAt(0) === '/' ? link.substring(1) : link
    const fetchUrl = `${getStorageHost()}/files/file?link=${stableLink}`
    return fetchUrl
}