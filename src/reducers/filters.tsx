export type FiltersType = {
  id: string;
  name: string;
  label: string;
  className: string;
};

export type InitStateType = {
  filters: FiltersType[];
  filtersLoadingStatus: string;
  activeFilter: string;
};

const initialState: InitStateType = {
  filters: [],
  filtersLoadingStatus: "idle",
  activeFilter: "all",
};

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

export type FiltersActionType =
  | FiltersFetching
  | FiltersFetched
  | FiltersFetchingError
  | ActiveFilterChanged;

const filters = (
  state: InitStateType = initialState,
  action: FiltersActionType
): InitStateType => {
  switch (action.type) {
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
      };
    default:
      return state;
  }
};

export default filters;
export type FiltersTypeAction = typeof filters;
