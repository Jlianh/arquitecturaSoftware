import { configureStore } from '@reduxjs/toolkit';
import numberReducer from './features/numberSlice';
import usersReducer from './features/userSlice';
import authReducer from './features/authSlice';
import { apiSlice } from './features/api/apiSlice';
import { apiHousesSlice } from './features/api/apiHousesSlice';
import { messageSlice } from './features/api/apiMessageSlice';

/** Agrupamos los estados en una sola ubicacion */

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        [apiHousesSlice.reducerPath]: apiHousesSlice.reducer,
        [messageSlice.reducerPath]: messageSlice.reducer,
        number: numberReducer,
        users: usersReducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware).concat(apiHousesSlice.middleware).concat(messageSlice.middleware),
})

export default store;