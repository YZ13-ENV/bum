import { db } from "@/utils/app"
import { doc, runTransaction } from "firebase/firestore"
import { Session } from "@/components/entities/session/session"

export const uploadSession = async(session: Session) => {
    if (session.sid) {
        const sessionRef = doc(db, 'sessions', session.sid)
        try {
        await runTransaction(db, async (transaction) => {
            const sfDoc = await transaction.get(sessionRef);
            if (!sfDoc.exists()) {
                transaction.set(sessionRef, session)
            }
            transaction.update(sessionRef, session);
        });
            console.log("Transaction successfully committed!");
        } catch (e) {
            console.log("Transaction failed: ", e);
        }
    }
}