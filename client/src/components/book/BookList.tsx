import BookBox from "./BookBox";
import axios from "axios";
import { useEffect, useState } from "react";

const BookList = () => {
    const [bookList, setBookList] = useState([]);
    const [isError, setIsError] = useState(false);
    
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
            .catch((error) => {
                setIsError(true);
            });
    };

    useEffect(() => {
        handleFetch();
    }, []);
    return (
        <ul>
            {bookList.map((data, idx) => (
                <li key={idx}>
                    <BookBox data={data}/>
                </li>
            ))}
        </ul>
    );
};

export default BookList;
