import {createReducer} from "@reduxjs/toolkit";

import{
    bingoFetching,
    bingoFetched,
    bingoFetchingError,
    bingoCreated,
    bingoDeleted
} from '../actions';

const initialState = {
    bingo: [],
    bingoLoadingStatus: 'idle'
}

const bingo = createReducer(initialState, builder => {
    builder
    .addCase(bingoFetching, state =>  {
        state.bingoLoadingStatus = 'loading';
    })
    .addCase(bingoFetched, (state, action) => {
        state.bingoLoadingStatus ='idle';
        state.bingo = action.payload;
    })
    .addCase(bingoFetchingError, state =>{
        state.bingoLoadingStatus = 'error';
    })
    .addCase(bingoCreated, (state, action) => {
        state.bingo.push(action.payload);
    })
    .addCase(bingoDeleted, (state, action) =>{
        state.bingo = state.bingo.filter(item => item.id !== action.payload)
    })
    .addDefaultCase(() => {});
})

export default bingo;