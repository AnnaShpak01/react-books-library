import { FiltersType } from "../reducers/filters";
import { BingoType } from "../reducers/bingo";
import { BookType } from "../reducers/books";

type InitMainStateType = {
  books: BookType[];
  booksLoadingStatus: string;
  filters: FiltersType[];
  filtersLoadingStatus: string;
  activeFilter: string;
  filteredBooks: BookType[];
  bingo: BingoType[];
  bingoLoadingStatus: string;
};

const initialState: InitMainStateType = {
  books: [],
  booksLoadingStatus: "idle",
  filters: [],
  filtersLoadingStatus: "idle",
  activeFilter: "all",
  filteredBooks: [],
  bingo: [],
  bingoLoadingStatus: "idle",
};

export const BOOKS_FETCHING = "BOOKS_FETCHING";
export type BOOKS_FETCHING = typeof BOOKS_FETCHING;

export interface BooksFetching {
  type: BOOKS_FETCHING;
}

export const BOOKS_FETCHED = "BOOKS_FETCHED";
export type BOOKS_FETCHED = typeof BOOKS_FETCHED;

export interface BooksFetched {
  type: BOOKS_FETCHED;
  payload: BookType[];
}

export const BOOKS_FETCHING_ERROR = "BOOKS_FETCHING_ERROR";
export type BOOKS_FETCHING_ERROR = typeof BOOKS_FETCHING_ERROR;

export interface BooksFetchingError {
  type: BOOKS_FETCHING_ERROR;
}

export const FILTERS_FETCHING = "FILTERS_FETCHING";
export type FILTERS_FETCHING = typeof FILTERS_FETCHING;

export interface FiltersFetching {
  type: FILTERS_FETCHING;
}

export const FILTERS_FETCHED = "FILTERS_FETCHED";
export type FILTERS_FETCHED = typeof FILTERS_FETCHED;

export interface FiltersFetched {
  type: FILTERS_FETCHED;
  payload: FiltersType[];
}

export const FILTERS_FETCHING_ERROR = "FILTERS_FETCHING_ERROR";
export type FILTERS_FETCHING_ERROR = typeof FILTERS_FETCHING_ERROR;

export interface FiltersFetchingError {
  type: FILTERS_FETCHING_ERROR;
}

export const ACTIVE_FILTER_CHANGED = "ACTIVE_FILTER_CHANGED";
export type ACTIVE_FILTER_CHANGED = typeof ACTIVE_FILTER_CHANGED;

export interface ActiveFilterChanged {
  type: ACTIVE_FILTER_CHANGED;
  payload: string;
}

export const BOOK_CREATED = "BOOK_CREATED";
export type BOOK_CREATED = typeof BOOK_CREATED;

export interface BookCreated {
  type: BOOK_CREATED;
  payload: BookType;
}

export const BOOK_DELETED = "BOOK_DELETED";
export type BOOK_DELETED = typeof BOOK_DELETED;

export interface BookDeleted {
  type: BOOK_DELETED;
  payload: string;
}

export const BINGO_FETCHING = "BINGO_FETCHING";
export type BINGO_FETCHING = typeof BINGO_FETCHING;

export interface BingoFetching {
  type: BINGO_FETCHING;
}

export const BINGO_FETCHED = "BINGO_FETCHED";
export type BINGO_FETCHED = typeof BINGO_FETCHED;

export interface BingoFetched {
  type: BINGO_FETCHED;
  payload: BingoType[];
}

export const BINGO_FETCHING_ERROR = "BINGO_FETCHING_ERROR";
export type BINGO_FETCHING_ERROR = typeof BINGO_FETCHING_ERROR;

export interface BingoFetchingError {
  type: BINGO_FETCHING_ERROR;
}

export const BINGO_CREATED = "BINGO_CREATED";
export type BINGO_CREATED = typeof BINGO_CREATED;

export interface BingoCreated {
  type: BINGO_CREATED;
  payload: BingoType;
}

export const BINGO_DELETED = "BINGO_DELETED";
export type BINGO_DELETED = typeof BINGO_DELETED;

export interface BingoDeleted {
  type: BINGO_DELETED;
  payload: string;
}

export type actionsTypes =
  | BooksFetching
  | BooksFetched
  | BooksFetchingError
  | FiltersFetching
  | FiltersFetched
  | FiltersFetchingError
  | ActiveFilterChanged
  | BookCreated
  | BookDeleted
  | BingoFetching
  | BingoFetched
  | BingoFetchingError
  | BingoCreated
  | BingoDeleted;

const reducer = (
  state: InitMainStateType = initialState,
  action: actionsTypes
) => {
  switch (action.type) {
    case "BOOKS_FETCHING":
      return {
        ...state,
        booksLoadingStatus: "loading",
      };
    case "BOOKS_FETCHED":
      return {
        ...state,
        books: action.payload,
        filteredBooks:
          state.activeFilter === "all"
            ? action.payload
            : action.payload.filter(
                (item) => item.status === state.activeFilter
              ),
        booksLoadingStatus: "idle",
      };
    case "BOOKS_FETCHING_ERROR":
      return {
        ...state,
        booksLoadingStatus: "error",
      };
    case "FILTERS_FETCHING":
      return {
        ...state,
        filtersLoadingStatus: "loading",
      };
    case "FILTERS_FETCHED":
      return {
        ...state,
        filters: action.payload,
        filtersLoadingStatus: "idle",
      };
    case "FILTERS_FETCHING_ERROR":
      return {
        ...state,
        filtersLoadingStatus: "error",
      };
    case "ACTIVE_FILTER_CHANGED":
      return {
        ...state,
        activeFilter: action.payload,
        filteredBooks:
          action.payload === "all"
            ? state.books
            : state.books.filter((item) => item.status === action.payload),
      };
    case "BOOK_CREATED":
      let newCreatedBookList = [...state.books, action.payload];
      return {
        ...state,
        books: newCreatedBookList,
        filteredBooks:
          state.activeFilter === "all"
            ? newCreatedBookList
            : newCreatedBookList.filter(
                (item) => item.status === state.activeFilter
              ),
      };
    case "BOOK_DELETED":
      const newBookList = state.books.filter(
        (item) => item.id !== action.payload
      );
      return {
        ...state,
        books: newBookList,
        filteredBooks:
          state.activeFilter === "all"
            ? newBookList
            : newBookList.filter((item) => item.status === state.activeFilter),
      };

    case "BINGO_FETCHING":
      return {
        ...state,
        bingoLoadingStatus: "loading",
      };
    case "BINGO_FETCHED":
      return {
        ...state,
        bingo: action.payload,
        bingoLoadingStatus: "idle",
      };
    case "BINGO_FETCHING_ERROR":
      return {
        ...state,
        bingoLoadingStatus: "error",
      };
    case "BINGO_CREATED":
      let newCreatedBingoList = [...state.bingo, action.payload];
      return {
        ...state,
        bingo: newCreatedBingoList,
      };
    case "BINGO_DELETED":
      const newBingoList = state.bingo.filter(
        (item) => item.id !== action.payload
      );
      return {
        ...state,
        bingo: newBingoList,
      };
    default:
      return state;
  }
};

export default reducer;
