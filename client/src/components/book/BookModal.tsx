import axios from "axios";
import { ChangeEvent, EventHandler, FormEvent, MouseEventHandler, SetStateAction, useState } from "react";
import { BookCreateRequest } from "../../models/book.model";
import { type } from "os";
import moment from "moment";

export interface FormValue {
    title: string;
    author?: string;
    publisher?: string;
    startPageNum: number;
    endPageNum: number;
    startDate: string;
    endDate: string;
}

interface Props {
    setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}


const BookModal = ({ setModalIsOpen }: Props) => {
    const [isError, setIsError] = useState(false);
    const [startPageNum, setStartPageNum] = useState(1);
    const [endPageNum, setEndPageNum] = useState(2);
    const [pageErrMsgShow, setPageErrMsgShow] = useState(false);
    const [startDate, setStartDate] = useState(moment().format("yyyy-MM-DD"));
    const [endDate, setEndDate] = useState(moment().add(1, "months").format("yyyy-MM-DD"));
    const [dateErrMsgShow, setDateErrMsgShow] = useState(false);
    const totalPage = endPageNum - startPageNum + 1;
    const totalPeriod = moment(endDate).diff(moment(startDate), "days") + 1;

    /** 유효성 검사 */
    const validatePageInput = () => {
        //시작페이지 <= 종료페이지 이여야 한다.
        if(totalPage >= 2 ) {
            setPageErrMsgShow(false);
        } else {
            setPageErrMsgShow(true);
            return false;
        }

        return true;
    }
    const validateDateInput = () => {
        //시작일 < 종료일 이어야 한다.
        if(totalPeriod >= 2) {
            setDateErrMsgShow(false);
        } else {
            setDateErrMsgShow(true);
            return false;
        }

        return true;
    }

    const handleFetch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(!validatePageInput() || !validateDateInput()) return;

        const formData = new FormData(e.currentTarget);

        const title = String(formData.get('title'));
        const startPageNum = Number(formData.get('startPageNum'));
        const endPageNum = Number(formData.get('endPageNum'));
        const startDate = String(formData.get('startDate'));
        const endDate = String(formData.get('endDate'));
        
        const author = String(formData.get('author'))|| null;
        const publisher = String(formData.get('publisher')) || null;

        const body: BookCreateRequest = {
            title,
            startPageNum,
            endPageNum,
            startDate,
            endDate,
        }

        if(author !== null) {
            body.author = author;
        } 
        if(publisher !== null) {
            body.publisher = publisher;
        } 

        // console.log(body);

        axios
            .post("http://localhost:4000/book", body)
            .then((response) => {
                const data = response.data;
                if(data.result === 'OK') {
                    setIsError(false);
                    alert('도서 등록이 완료되었습니다.');
                    setModalIsOpen(false);
                }
            })
            .catch((error) => {
                setIsError(true);
            });
    };

    return (
        <div>
            <h2>책 등록하기</h2>
            <form onSubmit={handleFetch}>
                <div>
                    <label htmlFor="book-title">책 제목*</label>
                    <input
                        id="book-title"
                        name="title"
                        required
                        minLength={1}
                        maxLength={200}
                    />
                </div>
                <div>
                    <label htmlFor="book-author">저자</label>
                    <input
                        id="book-author"
                        name="author"
                        minLength={1}
                        maxLength={100}
                    />
                </div>
                <div>
                    <label htmlFor="book-publisher">출판사</label>
                    <input
                        id="book-publisher"
                        name="publisher"
                        minLength={1}
                        maxLength={100}
                    />
                </div>
                <div>
                    <span>페이지*</span>
                    <div>
                        <label htmlFor="book-start-page-num">시작 페이지</label>
                        <input
                            type="number"
                            id="book-start-page-num"
                            name="startPageNum"
                            required
                            min={1}
                            value={startPageNum}
                            onChange={(e) => {setStartPageNum(Number(e.target.value)); validatePageInput();}}
                        />
                        p ~
                        <label htmlFor="book-end-page-num">마지막 페이지</label>
                        <input
                            type="number"
                            id="book-end-page-num"
                            name="endPageNum"
                            required
                            min={2}
                            value={endPageNum}
                            onChange={(e) => {setEndPageNum(Number(e.target.value)); validatePageInput();}}
                        />
                        p
                    </div>
                    {pageErrMsgShow && <p>마지막 페이지는 시작 페이지 보다 커야합니다.</p>}
                </div>
                <div>
                    <span>기간*</span>
                    <div>
                        <label htmlFor="book-start-date-num">시작일</label>
                        <input
                            type="date"
                            id="book-start-date-num"
                            name="startDate"
                            required
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />{" "}
                        ~<label htmlFor="book-end-date-num">종료일</label>
                        <input
                            type="date"
                            id="book-end-date-num"
                            name="endDate"
                            required
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>
                    {dateErrMsgShow && <p>죵료일은 시작일 보다 커야합니다.</p>}
                </div>
                <div>
                    <div>
                        <div>총페이지: {totalPage}p</div>
                        <div>총 기간: {totalPeriod}일</div>
                        <div>일일 권장 독서량: {Math.ceil(totalPage / totalPeriod)}p</div>
                        <span>총 페이지 / 기간 = {totalPage} p / {totalPeriod} 일 = {Math.ceil(totalPage / totalPeriod)}p (반올림)</span>
                    </div>
                </div>
                <button type="reset" onClick={() => setModalIsOpen(false)}>
                    닫기
                </button>
                <button type="submit">등록</button>
            </form>
        </div>
    );
};

export default BookModal;
