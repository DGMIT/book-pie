import styled from "styled-components";
import { Link } from "react-router-dom";
import { Book } from "../../models/book.model";
import axios from "axios";
import { useState } from "react";
import BookModal from "./BookModal";

const StyledBookBox = styled.div`
    border: 1px solid #ddd;
    border-radius: 6px;
    margin-bottom: 20px;
    padding: 10px 20px;

    .box-top {
        display: flex;
        height: 20px;
        justify-content: flex-end;
        p {
            margin-right: 10px;
        }
    }

    .main {
        display: flex;
    }
    .chart {
        margin-right: 30px;
    }
    .contents {
        flex: 1;
        .button-box {
            text-align: right;
        }
    }
`;

const BookBox = ({data}: {data: Book}) => {
    const [isError, setIsError] = useState<boolean>(false);
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

    const bookId = data.bookId;
    const startDate = data.startDate.slice(0, 10);
    const endDate = data.endDate.slice(0, 10);
    const gapTime = new Date(endDate).getTime() - new Date(startDate).getTime();
    const gapDay = Math.ceil(gapTime / (1000 * 60 * 60 * 24));
    const countDay = Math.ceil((new Date().getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24));

    //일일 권장 독서량
    const leftPage = data.endPageNum - data.startPageNum; //수정 해야함
    const leftDay = gapDay - countDay;
    const pagePerDay = Math.ceil(leftPage / leftDay);

    const handleUpdateBtn = () => {
        setModalIsOpen(true);
    }

    const handleDeleteBtn = () => {
        axios
            .delete("http://localhost:4000/book" + bookId)
            .then((response) => {
                const data = response.data;
                if(data.result === 'OK') {
                    setIsError(false);
                }
            })
            .catch((error) => {
                setIsError(true);
                alert('삭제되었습니다.');
            });
        }


    return (
        <StyledBookBox>
            <div className="box-top">
                <p>{`${startDate} ~ ${endDate} (${gapDay}일)`}</p>
                <button onClick={handleUpdateBtn}>수정</button>
                <BookModal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} data={data}/>
                <button onClick={handleDeleteBtn}>삭제</button>
            </div>
            <div className="main">
                <div className="chart">
                    <p>D {leftDay}</p>
                    <div>차트 56%</div>
                    <p>120 / {data.endPageNum} p</p>
                </div>
                <div className="contents">
                    <h2>{data.title}</h2>
                    <p>{`${data.author ? data.author : ''}${data.author && data.publisher ? ' | ' :''}${data.publisher ? data.publisher : ''}`}</p>
                    <div>
                        <p>{countDay}일차</p>
                        <div>
                            {/* <p>14일 연속 성공🔥🔥</p>
                            <p>✅ 성공 18일  ❌ 실패 3일</p> */}
                        </div>
                        <div>
                            <p>일일 권장 독서량   {pagePerDay}p</p>
                            <p>남은 페이지 / 남은 일수 =  {leftPage}p / {leftDay}일</p>
                        </div>
                        <div className="button-box">
                            <button><Link to='/report/1'>독서하기</Link></button>
                        </div>
                    </div>
                </div>
            </div>
        </StyledBookBox>
    )
}

export default BookBox;