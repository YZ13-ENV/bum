import { createSlice } from '@reduxjs/toolkit'

type InitState = {
    user: object | null
    loading: boolean
}

const initialState: InitState = {
    user: null,
    loading: true
}

const AuthWatcherSlice = createSlice({
    name: 'auth-watcher',
    initialState,
    reducers: {
        setUser(state, { payload, type }: { payload: InitState['user'], type: string }) {
            state.user = payload
        },
        setUserLoading(state, { payload, type }: { payload: InitState['loading'], type: string }) {
            state.loading = payload
        },
    }
})
export const { setUser, setUserLoading } = AuthWatcherSlice.actions
export default AuthWatcherSlice.reducer