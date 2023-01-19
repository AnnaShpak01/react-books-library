const initialState = {
    books: [],
    booksLoadingStatus: 'idle',
    filters: [],
    filtersLoadingStatus: 'idle',
    activeFilter: 'all',
    filteredBooks: [],
    bingo:[],
    bingoLoadingStatus: 'idle',
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'BOOKS_FETCHING':
            return {
                ...state,
                booksLoadingStatus: 'loading'
            }
        case 'BOOKS_FETCHED':
            return {
                ...state,
                books: action.payload,
                filteredBooks: state.activeFilter === 'all' ? 
                                action.payload : 
                                action.payload.filter(item => item.status === state.activeFilter),
                booksLoadingStatus: 'idle'
            }
        case 'BOOKS_FETCHING_ERROR':
            return {
                ...state,
                booksLoadingStatus: 'error'
            }
        case 'FILTERS_FETCHING':
            return {
                ...state,
                filtersLoadingStatus: 'loading'
            }
        case 'FILTERS_FETCHED':
            return {
                ...state,
                filters: action.payload,
                filtersLoadingStatus: 'idle'
            }
        case 'FILTERS_FETCHING_ERROR':
            return {
                ...state,
                filtersLoadingStatus: 'error'
            }
        case 'ACTIVE_FILTER_CHANGED':
            return {
                ...state,
                activeFilter: action.payload,
                filteredBooks: action.payload === 'all' ? 
                                state.books :
                                state.books.filter(item => item.status === action.payload)
            }
        case 'BOOK_CREATED':
            let newCreatedBookList = [...state.books, action.payload];
            return {
                ...state,
                books: newCreatedBookList,
                filteredBooks: state.activeFilter === 'all' ? 
                                newCreatedBookList : 
                                newCreatedBookList.filter(item => item.status === state.activeFilter)
            }
        case 'BOOK_DELETED': 
            const newBookList = state.books.filter(item => item.id !== action.payload);
            return {
                ...state,
                books: newBookList,
                filteredBooks: state.activeFilter === 'all' ? 
                                newBookList : 
                                newBookList.filter(item => item.status === state.activeFilter)
            }

            case 'BINGO_FETCHING':
                return {
                    ...state,
                    bingoLoadingStatus: 'loading'
                }
            case 'BINGO_FETCHED':
                return {
                    ...state,
                    bingo: action.payload,
                    bingoLoadingStatus: 'idle'
                }
            case 'BINGO_FETCHING_ERROR':
                return {
                    ...state,
                    bingoLoadingStatus: 'error'
                }
                case 'BINGO_CREATED':
                    let newCreatedBingoList = [...state.bingo, action.payload];
                    return {
                        ...state,
                        bingo: newCreatedBingoList,
                    }
                case 'BINGO_DELETED': 
                    const newBingoList = state.bingo.filter(item => item.id !== action.payload);
                    return {
                        ...state,
                        bingo: newBingoList,
                    }
        default: return state
    }
}

export default reducer;