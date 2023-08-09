import { createSlice } from "@reduxjs/toolkit"


type InitState = {
    darkMode: boolean
}

const initialState: InitState = {
    darkMode: true
}

const SettingsSlice = createSlice({
    name: 'settings-control',
    initialState,
    reducers: {
        setDarkMode(state, { payload, type }: { payload: InitState['darkMode'], type: string }) {
            state.darkMode = payload
        }
    }
})
export const { setDarkMode } = SettingsSlice.actions
export default SettingsSlice.reducer