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

    //도서 데이터 가져오기, api 호출부 컴포넌트에서 분리
    const getBookData = async () => {
        try {
            const response = await axios.get(
                "http://localhost:4000/book/" + bookId
            );
            const data = response.data;
            if (data.result === "OK") {
                setBookData(data.bookData);
                setIsError(false);
            } else {
                setIsError(true);
            }
        } catch (error) {
            setIsError(true);
        }
    };

    useEffect(() => {
        getBookData();
    }, []);

    return (
        <>
            {bookData && (
                <>
                    <BookBox data={bookData} />
                    {bookId && <ReportList bookId={bookId} />}
                </>
            )}
        </>
    );
};

export default ReportPage;
