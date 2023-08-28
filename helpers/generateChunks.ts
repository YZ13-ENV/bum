import { getHost } from "./getHost"

export const generateChunks = (chunkCount: number, order: string) => {
    const chunks = []
    for (let i = 0; i < chunkCount; i++) {
        const chunkLink = `${getHost()}/shots/v2/chunkedAllShots/${order}?skip=${i * 16}`
        chunks.push(chunkLink)
    }
    return chunks
}