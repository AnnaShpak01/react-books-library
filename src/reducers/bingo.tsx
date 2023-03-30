export type BingoType = {
  task: string;
  color: string;
  status: boolean;
  id: string;
};

type InitBingoState = {
  bingo: BingoType[];
  bingoLoadingStatus: string;
};

const initialState: InitBingoState = {
  bingo: [],
  bingoLoadingStatus: "idle",
};

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

export type bingoActionType =
  | BingoFetching
  | BingoFetched
  | BingoFetchingError
  | BingoCreated
  | BingoDeleted;

const bingo = (
  state: InitBingoState = initialState,
  action: bingoActionType
) => {
  switch (action.type) {
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

export default bingo;
