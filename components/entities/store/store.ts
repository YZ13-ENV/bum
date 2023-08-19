import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import AuthReducer from '@/components/entities/authProcess/store'
import SearchReducer from '@/components/entities/search/store'

// uploader reducers
import ThumbnailStatusReducer from '@/components/entities/uploader/thumbnail.store'
import DraftReducer from '@/components/entities/uploader/draft.store'
import ModalsReducer from '@/components/entities/uploader/modal.store'

const uploader = combineReducers({ modals: ModalsReducer, draft: DraftReducer, thumbnail: ThumbnailStatusReducer })


export const store = configureStore({
    reducer: {
        uploader: uploader,
        auth: AuthReducer,
        search: SearchReducer,
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