import { ShotForUpload } from '@/types';
import { createSlice } from '@reduxjs/toolkit';

type InitState = {
    draftId: string | null
    shot: ShotForUpload
    prevWorkSidebar: boolean
    blocksSidebar: boolean
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
    prevWorkSidebar: false
}

const ShotUploaderSlice = createSlice({
    name: 'shot-uploader',
    initialState,
    reducers: {
        setDraftId(state, { payload, type }: { payload: InitState['draftId'], type: string }) {
            state.draftId = payload
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
    }
})
export const { setDraftId, setBlocks, setRootBlock, setTitle, setBlockSidebar, setPrevWorkSidebar } = ShotUploaderSlice.actions
export default ShotUploaderSlice.reducer