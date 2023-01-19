import {createReducer} from "@reduxjs/toolkit";

import{
    booksFetching,
    booksFetched,
    booksFetchingError,
    bookCreated,
    bookDeleted
} from '../actions';

const initialState = {
    books: [],
    booksLoadingStatus: 'idle'
}

const books = createReducer(initialState, builder => {
    builder
    .addCase(booksFetching, state =>  {
        state.booksLoadingStatus = 'loading';
    })
    .addCase(booksFetched, (state, action) => {
        state.booksLoadingStatus ='idle';
        state.books = action.payload;
    })
    .addCase(booksFetchingError, state =>{
        state.booksLoadingStatus = 'error';
    })
    .addCase(bookCreated, (state, action) => {
        state.books.push(action.payload);
    })
    .addCase(bookDeleted, (state, action) =>{
        state.books = state.books.filter(item => item.id !== action.payload)
    })
    .addDefaultCase(() => {});
})

export default books;