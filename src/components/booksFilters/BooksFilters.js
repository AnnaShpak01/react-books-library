import {useHttp} from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import store from '../../store';

import { filtersChanged, fetchFilters, selectAll } from './filtersSlice';
import Spinner from '../spinner/Spinner';

const BooksFilters = () => {

    const {filtersLoadingStatus, activeFilter} = useSelector(state => state.filters);
    const filters = selectAll(store.getState());
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(fetchFilters(request));
        // eslint-disable-next-line
    }, []);

    if (filtersLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (filtersLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Loading Error</h5>
    }

    const renderFilters = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Filters no founded</h5>
        }

        return arr.map(({name, label}) => {

            const btnClass = classNames('btn', {
                'active': name === activeFilter
            });
            
            return <button 
                        key={name} 
                        id={name} 
                        className={btnClass}
                        onClick={() => dispatch(filtersChanged(name))}
                        >{label}</button>
        })
    }

    const elements = renderFilters(filters);

    return (
        <div className=" shadow-lg mb-4 rounded bordered">
            <div className="card-body centered-intro rounded">
                <p className="card-text filters-label">Filter by status</p>
                <div className="btn-group filters-block bordered rounded">
                    {elements}
                </div>
            </div>
        </div>
    )
}

export default BooksFilters;