import { createSlice } from "@reduxjs/toolkit"




type InitState = {
    isOpen: boolean
}

const initialState: InitState = {
    isOpen: false
}

const SearchSlice = createSlice({
    name: 'search-control',
    initialState,
    reducers: {
        setSearchOpen(state, { payload, type }: { payload: InitState['isOpen'], type: string }) {
            state.isOpen = payload
        }
    }
})

export const { setSearchOpen } = SearchSlice.actions
export default SearchSlice.reducer