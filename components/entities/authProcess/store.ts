import { ShortUserData } from "@/types"
import { createSlice } from "@reduxjs/toolkit"



type InitState = {
    step: 'email' | 'password' | 'success' | 'failed'
    email: string
    password: string
    loading: boolean
    focused: boolean
    userInProcess: ShortUserData | null
}

const initialState: InitState = {
    email: '',
    password: '',
    focused: false,
    loading: false,
    step: 'email',
    userInProcess: null
}

const authSlice = createSlice({
    name: 'auth-control',
    initialState,
    reducers: {
        setEmail(state, { payload, type }: { payload: InitState['email'], type: string }) {
            state.email = payload
        },
        setPassword(state, { payload, type }: { payload: InitState['password'], type: string }) {
            state.password = payload
        },
        setFocused(state, { payload, type }: { payload: InitState['focused'], type: string }) {
            state.focused = payload
        },
        setLoading(state, { payload, type }: { payload: InitState['loading'], type: string }) {
            state.loading = payload
        },
        setStep(state, { payload, type }: { payload: InitState['step'], type: string }) {
            state.step = payload
        },
        setUserInProcess(state, { payload, type }: { payload: InitState['userInProcess'], type: string }) {
            state.userInProcess = payload
        },
    }
})
export const { setEmail, setFocused, setLoading, setPassword, setStep, setUserInProcess } = authSlice.actions
export default authSlice.reducer