import { ShotForUpload } from '@/types';
import { createSlice } from '@reduxjs/toolkit';

type InitState = {
    draftId: string | null
    shot: ShotForUpload
    prevWorkSidebar: boolean
    blocksSidebar: boolean
    finalTouchModal: boolean
}

const initialState: InitState = {
    draftId: null,
    shot: {
        blocks: [],
        rootBlock: {
            type: 'image',
            link: ''
        },
        title: ''
    },
    blocksSidebar: false,
    prevWorkSidebar: false,
    finalTouchModal: false
}

const ShotUploaderSlice = createSlice({
    name: 'shot-uploader',
    initialState,
    reducers: {
        setDraftId(state, { payload, type }: { payload: InitState['draftId'], type: string }) {
            state.draftId = payload
        },
        setShot(state, { payload, type }: { payload: InitState['shot'], type: string }) {
            state.shot = payload
        },
        setBlocks(state, { payload, type }: { payload: ShotForUpload['blocks'], type: string }) {
            state.shot.blocks = payload
        },
        setRootBlock(state, { payload, type }: { payload: ShotForUpload['rootBlock'], type: string }) {
            state.shot.rootBlock = payload
        },
        setTitle(state, { payload, type }: { payload: ShotForUpload['title'], type: string }) {
            state.shot.title = payload
        },
        setBlockSidebar(state, { payload, type }: { payload: InitState['blocksSidebar'], type: string }) {
            state.blocksSidebar = payload
        },
        setPrevWorkSidebar(state, { payload, type }: { payload: InitState['prevWorkSidebar'], type: string }) {
            state.prevWorkSidebar = payload
        },
        setFinalTouchModal(state, { payload, type }: { payload: InitState['finalTouchModal'], type: string }) {
            state.finalTouchModal = payload
        },
    }
})
export const { setDraftId, setBlocks, setRootBlock, setShot, setTitle, setBlockSidebar, setPrevWorkSidebar, setFinalTouchModal } = ShotUploaderSlice.actions
export default ShotUploaderSlice.reducer