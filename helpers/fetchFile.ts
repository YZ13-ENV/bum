import { storage } from "@/utils/app"
import { getDownloadURL, ref } from "firebase/storage"
import { getStorageHost } from "./getHost"

export const fetchFile = async(link: string): Promise<string | null> => {
    const stableLink = link.charAt(0) === '/' ? link.substring(1) : link
    const refToFile = ref(storage, stableLink)
    try {
        const urlRes = await fetch(`${getStorageHost()}/files/file?link=${stableLink}`, {
            cache: 'no-cache',
        })
        const url = await urlRes.json()
        const fetchToCheck = await fetch(url)
        if (fetchToCheck.ok) {
            return url
        } else throw new Error("error while fetch");
    } catch(e) {
        console.log(e)
        try {
            const url = await getDownloadURL(refToFile)
            return url
        } catch(e) {
            console.log(e)
            return null
        }
    }
}