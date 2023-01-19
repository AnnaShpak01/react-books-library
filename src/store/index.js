import { configureStore } from '@reduxjs/toolkit';
import filters from '../components/booksFilters/filtersSlice';
import { bingoSlice } from '../components/bookChallengePage/bingoSlice';
import { apiSlice } from '../api/apiSlice'; 

const stringMiddleware = () => (next) => (action) => {
    if (typeof action === 'string') {
        return next({
            type: action
        })
    }
    return next(action)
};

const store = configureStore({
    reducer: {  filters, [bingoSlice.reducerPath]: bingoSlice.reducer,
                [apiSlice.reducerPath]: apiSlice.reducer},
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware, apiSlice.middleware),
    devTools: process.env.NODE_ENV !== 'production'
})

export default store;