import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup} from 'react-transition-group';
import {BookType,InintialBooksType} from '../../reducers/books'
import { InitStateType } from '../../reducers/filters';
import { useGetBooksQuery, useDeleteBookMutation} from '../../api/apiSlice';

import BooksListItem from "../booksListItem/BooksListItem";
import Spinner from '../spinner/Spinner';

import './booksList.scss';
import React from 'react';

type BookQuery = {
    data: BookType[]
    isLoading: boolean
    isError:boolean
}

const BooksList = () => {
    const {
        data: books = [],
        isLoading,
        isError,
    } = useGetBooksQuery();
    const [deleteBook] = useDeleteBookMutation();

    const activeFilter = useSelector((state:any) => state.filters.activeFilter);

    const filteredBooks = useMemo(() => {
        const filteredBooks = books.slice();

        if (activeFilter === 'all') {
            return filteredBooks;
        } else {
            return filteredBooks.filter((item: BookType) => item.status === activeFilter);
        }
    }, [books, activeFilter]);

    const onDelete = useCallback((id) => {
        deleteBook(id);
        // eslint-disable-next-line  
    }, []);

    if (isLoading) {
        return <Spinner/>;
    } else if (isError) {
        return <h5 className="text-center mt-5">Loading error</h5>
    }

    const renderBooksList = (arr:BookType[]) => {
        if (arr.length === 0) {
            return (
                <CSSTransition
                    timeout={0}
                    classNames="hero">
                    <h5 className="text-center mt-5">No Books yet </h5>
                </CSSTransition>
            )
        }

        return arr.map(({id, ...props}) => {
            return (
                <CSSTransition 
                    key={id}
                    timeout={500}
                    classNames="hero">
                    <BooksListItem  {...props} onDelete={() => onDelete(id)} />
                </CSSTransition>
            )
        })
    }

    const elements = renderBooksList(filteredBooks);
    return (
        <TransitionGroup component="div" className={"body-of-table"}>
            {elements}
        </TransitionGroup>
    )
}

export default BooksList;