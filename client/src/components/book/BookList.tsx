import BookBox from "./BookBox";
import axios from "axios";
import { useEffect, useState } from "react";
import { Book } from "../../models/book.model";

const BookList = () => {
    const [bookList, setBookList] = useState<Book[]>();
    const [isError, setIsError] = useState<boolean>(false);
    
    const getBookList = async () => {
        try{
            const response = await axios.get("http://localhost:4000/book");
            const data = response.data;
            setBookList(data);
        } catch(error) {
            setIsError(true);
        }
    };

    useEffect(() => {
        getBookList();
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
