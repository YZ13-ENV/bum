import { ShotForUpload } from '@/types';
import { createSlice } from '@reduxjs/toolkit';


type InitState = ShotForUpload

const initialState: InitState = {
    blocks: [],
    rootBlock: {
        type: 'image',
        link: ''
    },
    title: ''
}

const ShotUploaderSlice = createSlice({
    name: 'shot-uploader',
    initialState,
    reducers: {
        setBlocks(state, { payload, type }: { payload: InitState['blocks'], type: string }) {
            state.blocks = payload
        },
        setRootBlock(state, { payload, type }: { payload: InitState['rootBlock'], type: string }) {
            state.rootBlock = payload
        },
        setTitle(state, { payload, type }: { payload: InitState['title'], type: string }) {
            state.title = payload
        },
    }
})
export const { setBlocks, setRootBlock, setTitle } = ShotUploaderSlice.actions
export default ShotUploaderSlice.reducer