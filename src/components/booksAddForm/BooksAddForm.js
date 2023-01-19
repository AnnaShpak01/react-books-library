import { useState } from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import store from '../../store';

import { selectAll } from '../booksFilters/filtersSlice';
import { useCreateBookMutation } from '../../api/apiSlice';

const BooksAddForm = () => {
    const [bookName, setBookName] = useState('');
    const [bookDescr, setBookDescr] = useState('');
    const [bookAuthor, setBookAuthor] = useState('');
    const [bookGenre, setBookGenre] = useState('');
    const [bookColor, setBookColor] = useState('');
    const [bookStatus, setBookStatus] = useState('');
    const [bookPages, setBookPages] = useState('');
    const [bookImg, setBookImg] = useState('');

    const [createBook] = useCreateBookMutation();

    const {filtersLoadingStatus} = useSelector(state => state.filters);
    const filters = selectAll(store.getState());

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const newBook = {
            id: uuidv4(),
            name: bookName,
            author: bookAuthor,
            description: bookDescr,
            genre: bookGenre,
            status: bookStatus,
            color: bookColor,
            imgsrc: bookImg,
            pages: bookPages
        }

        createBook(newBook).unwrap();

        setBookName('');
        setBookDescr('');
        setBookAuthor('');
        setBookColor('');
        setBookGenre('');
        setBookImg('');
        setBookPages('');
        setBookStatus('');
    }

    const renderFilters = (filters, status) => {
        if (status === "loading") {
            return <option>Loading of elements</option>
        } else if (status === "error") {
            return <option>Loading Error</option>
        }
        
        if (filters && filters.length > 0 ) {
            return filters.map(({name, label}) => {
                // eslint-disable-next-line
                if (name === 'all')  return;

                return <option key={name} value={name}>{label}</option>
            })
        }
    }

    return (
        <form className="bordered p-4 shadow-lg rounded" onSubmit={onSubmitHandler}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-5">Name of the book </label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control bordered" 
                    id="name" 
                    placeholder="Name of the book"
                    value={bookName}
                    onChange={(e) => setBookName(e.target.value)}/>
            </div>

            <div className="mb-3">
                <label htmlFor="author" className="form-label fs-5">Author</label>
                <input 
                    required
                    type="text" 
                    name="author" 
                    className="form-control bordered" 
                    id="author" 
                    placeholder="Author of the book"
                    value={bookAuthor}
                    onChange={(e) => setBookAuthor(e.target.value)}/>
            </div>

            <div className="mb-3">
                <label htmlFor="description" className="form-label fs-5">Description</label>
                <textarea
                    required
                    name="description" 
                    className="form-control bordered" 
                    id="description" 
                    placeholder="Short summary about book"
                    style={{"height": '130px'}}
                    value={bookDescr}
                    onChange={(e) => setBookDescr(e.target.value)}/>
            </div>

            <div className="mb-3">
                <label htmlFor="genre" className="form-label fs-5">Genre</label>
                <input
                    required
                    type="text"
                    name="genre" 
                    className="form-control bordered" 
                    id="genre" 
                    placeholder="Genre of book"
                    value={bookGenre}
                    onChange={(e) => setBookGenre(e.target.value)}/>
            </div>
            <div className="mb-3">
                <label htmlFor="cover" className="form-label fs-5">Cover</label>
                <input
                    required
                    type="text"
                    name="cover" 
                    className="form-control bordered" 
                    id="cover" 
                    placeholder="Link on image"
                    value={bookImg}
                    onChange={(e) => setBookImg(e.target.value)}/>
            </div>

            <div className="mb-3">
                <label htmlFor="status" className="form-label fs-5">Status</label>
                <select 
                    required
                    className="form-select bordered" 
                    id="status" 
                    name="status"
                    value={bookStatus}
                    onChange={(e) => setBookStatus(e.target.value)}>
                    <option value="">Status of reading...</option>
                    {renderFilters(filters, filtersLoadingStatus)}
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="pages" className="form-label fs-5">Pages</label>
                <input
                    required
                    name="pages" 
                    type="text"
                    className="form-control bordered" 
                    id="pages" 
                    placeholder="Count of pages"
                    value={bookPages}
                    onChange={(e) => setBookPages(e.target.value)}/>
            </div>
            <div className="mb-3">
                <label htmlFor="element" className="form-label fs-5">Color</label>
                <select 
                    required
                    className="form-select bordered" 
                    id="element" 
                    name="element"
                    value={bookColor}
                    onChange={(e) => setBookColor(e.target.value)}>
                    <option value="">Choose color of the cover...</option>
                   <option value="red">Red</option>
                   <option value="yellow">Yellow</option>
                   <option value="green">Green</option>
                   <option value="blue">Blue</option>
                   <option value="brown">Brown</option>
                   <option value="pink">Pink</option>
                   <option value="violet">Violet</option>
                   <option value="orange">Orange</option>
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Add Book</button>
        </form>
    )
}

export default BooksAddForm;