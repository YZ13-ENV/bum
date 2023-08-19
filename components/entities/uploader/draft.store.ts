import { ShotForUpload } from "@/types";
import { createSlice } from "@reduxjs/toolkit";


const initialState: ShotForUpload = {
    blocks: [],
    rootBlock: {
        type: 'image',
        link: '',
    },
    title: '',
    thumbnail: null
}

const draftSlice = createSlice({
    name: 'draftControl',
    initialState,
    reducers: {
        setDraft(state, { payload, type }: { payload: ShotForUpload, type: string }) {
            state = payload
        },
        setBlocks(state, { payload, type }: { payload: ShotForUpload['blocks'], type: string }) {
            state.blocks = payload
        },
        setRootBlock(state, { payload, type }: { payload: ShotForUpload['rootBlock'], type: string }) {
            state.rootBlock = payload
        },
        setTitle(state, { payload, type }: { payload: ShotForUpload['title'], type: string }) {
            state.title = payload
        },
        setThumbnail(state, { payload, type }: { payload: ShotForUpload['thumbnail'], type: string }) {
            state.thumbnail = payload
        }
    }
})
export const { setDraft, setBlocks, setRootBlock, setThumbnail, setTitle } = draftSlice.actions
export default draftSlice.reducer