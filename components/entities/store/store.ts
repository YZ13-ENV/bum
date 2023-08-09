import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import ShotUploaderReducer from '@/components/entities/uploader/store'
import AuthReducer from '@/components/entities/authProcess/store'
import SearchReducer from '@/components/entities/search/store'
import SettingsReducer from '@/components/entities/settings/store'
export const store = configureStore({
    reducer: {
        uploader: ShotUploaderReducer,
        auth: AuthReducer,
        search: SearchReducer,
        settings: SettingsReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store;