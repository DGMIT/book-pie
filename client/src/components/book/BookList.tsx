import BookBox from "./BookBox";
import axios from "axios";
import { useEffect, useState } from "react";
import { Book } from "../../models/book.model";

const BookList = () => {
    const [bookList, setBookList] = useState<Book[]>();
    const [isError, setIsError] = useState<boolean>(false);
    
    const handleFetch = () => {
        axios
            .get("http://localhost:4000/book")
            .then((response) => {
                const data = response.data;
                if(data.result === 'OK') {
                    setBookList(data.bookList);
                    setIsError(false);
                }
            })
            .catch(() => {
                setIsError(true);
            });
    };

    useEffect(() => {
        handleFetch();
    }, []);
    return (
        <ul>
            {bookList && bookList.map((data: Book) => (
                <li key={data.bookId}>
                    <BookBox data={data}/>
                </li>
            ))}
        </ul>
    );
};

export default BookList;
