import { ShotData, DocShotData } from "@/types"
import { db } from "@/utils/app"
import { collectionGroup, getDocs } from "firebase/firestore"

export const getAllShot = async() => {
    const collRef = collectionGroup(db, 'shots')
    const snaps = await getDocs(collRef)
    const convertedSnaps = snaps.docs.map(snap => ({ ...snap.data() as ShotData, doc_id: snap.id } as DocShotData))
    return convertedSnaps
}