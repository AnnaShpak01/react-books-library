import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import { FiltersType, InitStateType } from "../../reducers/filters";
import { filtersChanged, fetchFilters } from "./filtersSlice";
import Spinner from "../spinner/Spinner";
import { useGetFiltersQuery } from "../../api/apiSlice";

const BooksFilters = () => {
  const { filtersLoadingStatus, activeFilter } = useSelector(
    (state: InitStateType) => state
  );
  const { data: filters = [] } = useGetFiltersQuery("Filters");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFilters());
    // eslint-disable-next-line
  }, []);

  if (filtersLoadingStatus === "loading") {
    return <Spinner />;
  } else if (filtersLoadingStatus === "error") {
    return <h5 className="text-center mt-5">Loading Error</h5>;
  }

  return (
    <div className=" shadow-lg mb-4 rounded bordered">
      <div className="card-body centered-intro rounded">
        <p className="card-text filters-label">Filter by status</p>
        <div className="btn-group filters-block bordered rounded">
          {filters.length === 0 && (
            <h5 className="text-center mt-5">Filters no founded</h5>
          )}
          {filters.length > 0 &&
            filters.map((item: FiltersType) => {
              const btnClass = classNames("btn", {
                active: item.name === activeFilter,
              });

              return (
                <button
                  key={item.name}
                  id={item.name}
                  className={btnClass}
                  onClick={() => dispatch(filtersChanged(item.name))}
                >
                  {item.label}
                </button>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default BooksFilters;
