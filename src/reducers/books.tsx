export type BookType = {
  status: string;
  name: string;
  author: string;
  description: string;
  imgsrc: string;
  color: string;
  genre: string;
  pages: number;
  id: string;
};

export type InintialBooksType = {
  books: BookType[];
  booksLoadingStatus: string;
  activeFilter: string;
};

const initialState: InintialBooksType = {
  books: [],
  booksLoadingStatus: "idle",
  activeFilter: "all",
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

export type booksActionType =
  | BooksFetching
  | BooksFetched
  | BooksFetchingError
  | BookCreated
  | BookDeleted;

const books = (
  state: InintialBooksType = initialState,
  action: booksActionType
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
    default:
      return state;
  }
};

export default books;
