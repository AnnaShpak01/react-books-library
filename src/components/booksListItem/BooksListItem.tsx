import React from "react"

type BookItemType = {
    name:string
    author: string
    genre: string
    pages: number
    status: string
    onDelete : () => void
}

const BooksListItem = ({name, author, genre, pages, status, onDelete}:BookItemType) => {

    return (
        <div className={`card-of-book`}>
            <div className="card-name">{name}</div>
            <div className="card-author">{author}</div>
            <div className="card-genre">{genre}</div>
            <div className="card-pages">{pages}</div>
            <div className="card-status">{status}</div>
            <div>
                <span onClick={onDelete} 
                    className="badge bordered rounded-pill">
                    <button type="button" className="btn-close btn-close" aria-label="Close"></button>
                </span>
                
            </div>
        </div>
    )
}

export default BooksListItem;