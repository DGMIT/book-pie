import { Link } from "react-router-dom";
import BookBox from "../components/book/BookBox";
import ReportList from "../components/report/ReportList";
import { Book } from "../models/book.model";

const ReportPage = () => {
    const data: Book = {
        author: "댄 밴더캄",
        bookId: 1,
        endDate: "2023-04-24T15:00:00.000Z",
        endPageNum: 316,
        publisher: "프로그래밍 인사이트",
        startDate: "2023-03-25T15:00:00.000Z",
        startPageNum: 8,
        title: "이펙티브 타입스크립",
        updateDatetime: null,
        // weekendIncludeYN: 'N',
        writtenDatetime: "2023-03-26T14:23:23.000Z",
    };

    return (
        <>
            <button>
                <Link to="/">책 목록으로</Link>
            </button>
            <h2>독후감 페이지</h2>
            <BookBox data={data} />
            <ReportList />
        </>
    );
};

export default ReportPage;
