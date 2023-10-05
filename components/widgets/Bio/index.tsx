'use client'
import { Button } from 'antd'
import React, { useLayoutEffect, useMemo, useState } from 'react'
import About from './ui/About'
import Skills from './ui/Skills'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '@/utils/app'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { isEqual } from 'lodash'
import { useDebounceEffect } from 'ahooks'

type Props = {
    uid: string
}
const Bio = ({ uid }: Props) => {
    const [user] = useAuthState(auth)
    const [about, setAbout] = useState<string>('')
    const [skills, setSkills] = useState<string[]>([])
    const bioDoc = useMemo(() => ({
        about: about,
        skills: skills
    }), [about, skills])
    const updatedBio = async() => {
        if (user) {
            const docRef = doc(db, 'users', user.uid)
            const docSnap = await getDoc(docRef)
            const bioField = docSnap.get('bio')
            if (!bioField) {
                const bio = bioDoc
                const entireDoc = { ...docSnap.data(), bio }
                await updateDoc(docRef, entireDoc)
            } else if (!isEqual(bioField, bioDoc)) {
                const bio = bioDoc
                const entireDoc = { ...docSnap.data(), bio }
                await updateDoc(docRef, entireDoc)
            }
        }
    }
    const getBio = async() => {
        const docRef = doc(db, 'users', uid)
        const docSnap = await getDoc(docRef)
        const bioField = docSnap.get('bio')
        if (bioField) {
            setAbout(bioField.about)
            setSkills(bioField.skills)
        }
    }
    useLayoutEffect(() => {
        getBio()
    },[uid])
    useDebounceEffect(() => {
        if (user && user.uid === uid) updatedBio()
    },[user, about, skills], { wait: 2000 })
    return (
        <>
            <div className="flex flex-col w-full gap-2 h-fit md:w-2/3">
                <About preparedValue={ user && user.uid === uid ? true : false } about={about} setAbout={setAbout} />
                <Skills preparedValue={ user && user.uid === uid ? true : false } skills={skills} setSkills={setSkills} />
            </div>
            <div className="flex flex-col w-full h-fit md:w-1/3">
                <div className="flex flex-col w-full gap-2 h-fit">
                    <span className="font-medium text-neutral-200">Соц. сети</span>
                    <Button disabled block>Временно недоступно</Button>
                </div>
            </div>
        </>
    )
}

export default Bio