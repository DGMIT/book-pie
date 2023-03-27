import axios from "axios";
import { FormEvent, useState } from "react";
import { Book, BookCreateRequest } from "../../models/book.model";
import moment from "moment";
import Modal from "react-modal";
import { time } from "console";

const customModalStyles = {
    content: {
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "700px",
        height: "400px",
    },
    overlay: {
        background: "rgba(0, 0, 0, 0.5)"
    }
};
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
    modalIsOpen: boolean;
    setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    data?: Book
}


const BookModal = ({ modalIsOpen, setModalIsOpen, data }: Props) => {
    const [isError, setIsError] = useState<boolean>(false);
    const [startPageNum, setStartPageNum] = useState(data?.startPageNum || 1);
    const [endPageNum, setEndPageNum] = useState(data?.endPageNum || 2);
    const [pageErrMsgShow, setPageErrMsgShow] = useState(false);
    const [startDate, setStartDate] = useState(data?.startDate ? data.startDate.slice(0, 10) : moment().format("yyyy-MM-DD"));
    const [endDate, setEndDate] = useState(data?.endDate ? data.endDate.slice(0, 10) : moment().add(1, "months").format("yyyy-MM-DD"));
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

        //create
        if(!data) {
            axios
            .post("http://localhost:4000/book", body)
            .then((response) => {
                const data = response.data;
                if(data.result === 'OK') {
                    setIsError(false);
                    alert('도서 등록이 완료되었습니다.');
                    setModalIsOpen(false);
                    window.location.replace('/');
                }
            })
            .catch((error) => {
                setIsError(true);
            });
        } else { //update
            axios
            .put("http://localhost:4000/book/" + data.bookId, body)
            .then((response) => {
                const data = response.data;
                if(data.result === 'OK') {
                    setIsError(false);
                    alert('도서 수정이 완료되었습니다.');
                    setModalIsOpen(false);
                    window.location.reload();
                }
            })
            .catch((error) => {
                setIsError(true);
            });
        }
    };

    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            style={customModalStyles}
            ariaHideApp={false}
        >
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
                        defaultValue={data ? data.title : ''}
                    />
                </div>
                <div>
                    <label htmlFor="book-author">저자</label>
                    <input
                        id="book-author"
                        name="author"
                        minLength={1}
                        maxLength={100}
                        defaultValue={data ? data.author : ''}
                    />
                </div>
                <div>
                    <label htmlFor="book-publisher">출판사</label>
                    <input
                        id="book-publisher"
                        name="publisher"
                        minLength={1}
                        maxLength={100}
                        defaultValue={data ? data.publisher : ''}
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
                    취소
                </button>
                <button type="submit">{data ? '수정' : '등록'}</button>
            </form>
            </Modal>
    );
};

export default BookModal;
