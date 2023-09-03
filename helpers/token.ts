import { Session } from "@/components/entities/session/session"
const url = process.env.NODE_ENV ? `http://localhost:3000/api/token` : `https://design.darkmaterial.space/api/token`

export const generateSidToken = async(session: Session): Promise<string | null> => {
    try {
        const headers = new Headers()
        headers.set("Content-Type", "application/json")
        const res = await fetch(url, {
            method: "POST",
            body: JSON.stringify(session)
        })
        if (res.ok) return await res.json()
        return null
    } catch (error) {
        return null
    }
}
export const verifySidToken = async(sid: string) => {
  try {
    const param = `?sid=${sid}`
    const res = await fetch(`${url}${param}`, { method: 'GET' })
    if (res.ok) {
        return await res.json()
    } return null
  } catch (error) {
    return null
  }
}