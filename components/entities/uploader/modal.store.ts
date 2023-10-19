import { createSlice } from "@reduxjs/toolkit"


type InitState = {
    fullScreenMediaLink: string | null
    enableMDSyntax: boolean
    draftId: string | null
    blocksSidebar: boolean
    prevWorkSidebar: boolean
    finalTouchModal: boolean
}

const initialState: InitState = {
    fullScreenMediaLink: null,
    enableMDSyntax: true,
    draftId: null,
    blocksSidebar: false,
    prevWorkSidebar: false,
    finalTouchModal: false
}

const ModalUploaderSlice = createSlice({
    name: 'modal-control',
    initialState,
    reducers: {
        setMediaLink(state, { payload, type }: { payload: InitState['fullScreenMediaLink'], type: string }) {
            state.fullScreenMediaLink = payload
        },
        setMDSyntax(state, { payload, type }: { payload: InitState['enableMDSyntax'], type: string }) {
            state.enableMDSyntax = payload
        },
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
export const { setMediaLink, setDraftId, setMDSyntax, setBlockSidebar, setPrevWorkSidebar, setFinalTouchModal } = ModalUploaderSlice.actions
export default ModalUploaderSlice.reducer