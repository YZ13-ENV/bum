import { createSlice } from "@reduxjs/toolkit"



type InitState = {
    syncLoading: boolean
}

const initialState: InitState = {
    syncLoading: false
}

const coreSlice = createSlice({
    name: 'core-control',
    initialState,
    reducers: {
        setSyncLoading(state, { payload, type }: { payload: InitState['syncLoading'], type: string }) {
            state.syncLoading = payload
        }
    }
})
export const { setSyncLoading } = coreSlice.actions
export default coreSlice.reducer