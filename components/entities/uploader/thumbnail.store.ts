import { createSlice } from "@reduxjs/toolkit"
import { RcFile } from "antd/es/upload"



type InitState = {
    loading: boolean
    success: boolean
    failed: boolean
    disabled: boolean
    previewLink: string | null
    forcedType: 'video' | 'image'
    savedFile: RcFile | null
}

const initialState: InitState = {
    disabled: true,
    failed: false,
    loading: false,
    success: false,
    previewLink: null,
    forcedType: 'image',
    savedFile: null
}

const thumbnailStatusSlice = createSlice({
    name: 'thumbnailStatusControl',
    initialState,
    reducers: {
        setSavedFile(state, { payload, type }: { payload: InitState['savedFile'], type: string }) {
            state.savedFile = payload
        },
        setForcedType(state, { payload, type }: { payload: InitState['forcedType'], type: string }) {
            state.forcedType = payload
        },
        setPreviewLink(state, { payload, type }: { payload: InitState['previewLink'], type: string }) {
            state.previewLink = payload
        },
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
export const { setDisabled, setFailed, setLoading, setSuccess, setForcedType, setPreviewLink, setSavedFile } = thumbnailStatusSlice.actions
export default thumbnailStatusSlice.reducer