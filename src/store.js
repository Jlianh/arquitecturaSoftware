import { configureStore } from '@reduxjs/toolkit';
import { bookSlice } from './features/api/bookSlice';
import { loanSlice } from './features/api/loanSlice';
import { studentsSlice } from './features/api/studentSlice';


/** Agrupamos los estados en una sola ubicacion */

const store = configureStore({
    reducer: {
        [studentsSlice.reducerPath]: studentsSlice.reducer,
        [bookSlice.reducerPath]: bookSlice.reducer,
        [loanSlice.reducerPath]: loanSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
    .concat(studentsSlice.middleware)
    .concat(bookSlice.middleware)
    .concat(loanSlice.middleware)
    
})

export default store;