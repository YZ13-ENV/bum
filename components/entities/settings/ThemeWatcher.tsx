import React, { useLayoutEffect } from 'react'
import { useAppSelector } from '../store/store'

const ThemeWatcher = () => {
    const darkMode = useAppSelector(state => state.settings.darkMode)
    const root = document.getElementById("root")
    useLayoutEffect(() => {
      if (root) {
        if (darkMode) {
          root.classList.add('dark')
        } else {
          root.classList.remove('dark')
        }
      }
    },[darkMode, root])
    return (
      <></>
    )
}

export default ThemeWatcher