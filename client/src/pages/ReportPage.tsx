import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookBox from "../components/book/BookBox";
import ReportList from "../components/report/ReportList";
import { Book } from "../models/book.model";


const ReportPage = () => {
    const { bookId } = useParams();
    const [isError, setIsError] = useState<boolean>(false);
    const [bookData, setBookData] = useState<Book>();

    //도서 데이터 가져오기
    const handleFetch = () => {
        axios
            .get("http://localhost:4000/book/" + bookId)
            .then((response) => {
                const data = response.data;
                if(data.result === 'OK') {
                    setBookData(data.bookData);
                    setIsError(false);
                }
            })
            .catch((error) => {
                setIsError(true);
            });
    };

    useEffect(() => {
        handleFetch();
    }, [])

    return (
        <>
            {bookData &&
                <>
                <BookBox data={bookData} />
                {bookId && <ReportList bookId={bookId}/>}
                </>
            }
        </>
    );
};

export default ReportPage;
