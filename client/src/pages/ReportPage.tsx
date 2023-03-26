import { Link } from "react-router-dom";
import BookBox from "../components/book/BookBox";
import ReportList from "../components/report/ReportList";

const ReportPage = () => {

    return (
        <>
        <button><Link to='/'>책 목록으로</Link></button>
        <h2>독후감 페이지</h2>
        <BookBox/>
        <ReportList/>
        </>
    )
}

export default ReportPage;