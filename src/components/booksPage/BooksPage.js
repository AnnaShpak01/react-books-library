import BooksList from "../booksList/BooksList"
import BooksAddForm from "../booksAddForm/BooksAddForm"
import BooksFilters from "../booksFilters/BooksFilters"
import "./booksPage.scss"

const BooksPage = () => {
    return(
        <div className="content book-page">
            <div>
                <BooksFilters/>
                <div className="table-bordered">
                    <div className="head-of-table">
                        <div>Name of the book</div>
                        <div>Author</div>
                        <div>Genre</div>
                        <div>Pages</div>
                        <div>Status</div>
                        <div>Delete</div>
                    </div>
                    <BooksList/>
                </div>
            </div>
            <div className="content__interactive">
                    <BooksAddForm/>
                    
            </div>
        </div>
    )
}

export default BooksPage;