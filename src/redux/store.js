import { configureStore } from "@reduxjs/toolkit";
import { useLoginMutation } from "./api/usersApiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "./api/apiSlice";
import authReducer from './features/auth/authSlice'


const store = configureStore({
    reducer: {
        [apiSlice.reducerPath] : apiSlice.reducerPath,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
})

setupListeners(store.dispatch);
export default store;
