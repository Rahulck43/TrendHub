import { configureStore, combineReducers } from "@reduxjs/toolkit"
import { persistStore, persistReducer } from "redux-persist"
import storage from 'redux-persist/lib/storage'
import userSlice from "./userSlice"
import adminSlice from "../../../admin/utils/store/adminSlice"
import allUsersSlice from "../../../admin/utils/store/allUsersSlice"





const rootReducer = combineReducers({
    user: userSlice,
    admin:adminSlice,
    allUsers:allUsersSlice
})

const persistConfig = {
    key: "root",
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer
})

const persistor = persistStore(store)



export { persistor, store }