'use client'
import { auth, db } from '@/utils/app'
import { addDoc, and, collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import { DateTime } from 'luxon'
import React, { useLayoutEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

type Props = {
    authorId: string
    shotId: string
}
const ViewsHistoryWatcher = ({ authorId, shotId }: Props) => {
    const [user, loading] = useAuthState(auth)
    const findIfExist = async( authorId: string, shotId: string ) => {
        if (user) {
            const collToSearch = collection(db, 'users', user.uid, 'history', 'views', 'dey')
            const q = query(collToSearch, and(where('authorId', '==', authorId), where('shotId', '==', shotId)))
            const snaps = await getDocs(q)
            if (snaps.empty) {
                return null
            } else {
                const pickedSnap = snaps.docs[0]
                const existedView = {
                    historyId: pickedSnap.id,
                    ...pickedSnap.data()
                }
                return existedView
            }
        }
    }
    const addToHistory = async() => {
        if (user) {
            const alreadyInHistory = await findIfExist(authorId, shotId)
            const preparedHistoryUnit = {
                createdAt: DateTime.now().toSeconds(),
                authorId: authorId,
                shotId: shotId
            }
            if (alreadyInHistory) {
                const docToUpdate = doc(db, 'users', user.uid, 'history', 'views', 'dey', alreadyInHistory.historyId)
                await updateDoc(docToUpdate, preparedHistoryUnit)
            } else {
                const collToAdd = collection(db, 'users', user.uid, 'history', 'views', 'dey')
                await addDoc(collToAdd, preparedHistoryUnit)
            }
        }
    }
    useLayoutEffect(() => {
        if (user && !loading) addToHistory()
    },[user, loading])
    return <></>
}

export default ViewsHistoryWatcher