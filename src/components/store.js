import { configureStore } from "@reduxjs/toolkit";
import numberReducer from "./features/numberSlice";
import { userSlice } from "./features/userSlice";
import  authReducer  from "./features/authSlice"
import { houseSlice } from "./features/houseSlice";

const store = configureStore({
    reducer: {
        number: numberReducer,
        auth: authReducer,
        [userSlice.reducerPath]: userSlice.reducer,
        [houseSlice.reducerPath]: houseSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userSlice.middleware),
})

export default store