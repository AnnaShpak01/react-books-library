import { useMemo } from "react";
import { useGetBooksQuery } from "../../api/apiSlice";
import { BookType } from "../../reducers/books";

const AlphabetChallenge = () => {
  const { data: books = [] } = useGetBooksQuery("Books");

  const shelves = useMemo(() => {
    const filteredBooks = books.slice();
    return filteredBooks;
  }, [books]);

  const rows: any = [[], []];

  for (let i = 65; i < 91; i++) {
    let book = shelves.find(
      (item: BookType) =>
        item.name.substr(0, 1).toUpperCase() === String.fromCharCode(i)
    );
    rows[i < 78 ? 0 : 1].push(
      <div className="line-alpha" key={i}>
        <div className="title-book">{String.fromCharCode(i)}</div>
        <div className="book-row">
          {book ? book.name.substr(1, book.name.length - 1) : ""}
        </div>
      </div>
    );
  }
  return (
    <div className="alfa-row">
      <div className="alfa-col">{rows[0]}</div>
      <div className="alfa-col">{rows[1]}</div>
    </div>
  );
};

export default AlphabetChallenge;
