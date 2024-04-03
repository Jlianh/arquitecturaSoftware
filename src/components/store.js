import { configureStore } from "@reduxjs/toolkit";
import numberReducer from "./features/numberSlice";
import { userSlice } from "./features/userSlice";
import  authReducer  from "./features/authSlice"
import { houseSlice } from "./features/houseSlice";
import { messageSlice } from "../features/api/apiMessageSlice";

const store = configureStore({
    reducer: {
        number: numberReducer,
        auth: authReducer,
        [userSlice.reducerPath]: userSlice.reducer,
        [houseSlice.reducerPath]: houseSlice.reducer,
        [messageSlice.reducerPath]: messageSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userSlice.middleware).concat(houseSlice.middleware).concat(apiMessageSlice.middleware),
})

export default store