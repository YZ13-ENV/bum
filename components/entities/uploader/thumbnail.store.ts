import { createSlice } from "@reduxjs/toolkit"



type InitState = {
    loading: boolean
    success: boolean
    failed: boolean
    disabled: boolean
}

const initialState: InitState = {
    disabled: true,
    failed: false,
    loading: false,
    success: false
}

const thumbnailStatusSlice = createSlice({
    name: 'thumbnailStatusControl',
    initialState,
    reducers: {
        setDisabled(state, { payload, type }: { payload: InitState['disabled'], type: string }) {
            state.disabled = payload
        },
        setFailed(state, { payload, type }: { payload: InitState['failed'], type: string }) {
            state.failed = payload
        },
        setLoading(state, { payload, type }: { payload: InitState['loading'], type: string }) {
            state.loading = payload
        },
        setSuccess(state, { payload, type }: { payload: InitState['success'], type: string }) {
            state.success = payload
        }
    }
})
export const { setDisabled, setFailed, setLoading, setSuccess } = thumbnailStatusSlice.actions
export default thumbnailStatusSlice.reducer