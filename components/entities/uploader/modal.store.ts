import { createSlice } from "@reduxjs/toolkit"


type InitState = {
    draftId: string | null
    blocksSidebar: boolean
    prevWorkSidebar: boolean
    finalTouchModal: boolean
}

const initialState: InitState = {
    draftId: null,
    blocksSidebar: false,
    prevWorkSidebar: false,
    finalTouchModal: false
}

const ModalUploaderSlice = createSlice({
    name: 'modal-control',
    initialState,
    reducers: {
        setDraftId(state, { payload, type }: { payload: InitState['draftId'], type: string }) {
            state.draftId = payload
        },
        setBlockSidebar(state, { payload, type }: { payload: InitState['blocksSidebar'], type: string }) {
            state.blocksSidebar = payload
        },
        setPrevWorkSidebar(state, { payload, type }: { payload: InitState['prevWorkSidebar'], type: string }) {
            state.prevWorkSidebar = payload
        },
        setFinalTouchModal(state, { payload, type }: { payload: InitState['finalTouchModal'], type: string }) {
            state.finalTouchModal = payload
        }
    }
})
export const { setDraftId, setBlockSidebar, setPrevWorkSidebar, setFinalTouchModal } = ModalUploaderSlice.actions
export default ModalUploaderSlice.reducer