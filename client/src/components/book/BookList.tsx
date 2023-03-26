import BookBox from "./BookBox";
import axios from "axios";
import { useEffect, useState } from "react";

const BookList = () => {
    const [bookList, setBookList] = useState([]);
    const handleFetch = () => {
        axios
            .get("http://localhost:4000/book")
            .then((response) => {
                console.log(response);
                const data = response.data;
                if(data.result === 'OK') {
                    setBookList(data.bookList);
                }
            })
            .catch((error) => {
                console.error(error);
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
