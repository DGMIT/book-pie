import styled from "styled-components";
import { Link } from "react-router-dom";
import { Book } from "../../models/book.model";

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
    const startDate = data.startDate.slice(0, 10);
    const endDate = data.endDate.slice(0, 10);
    const gapTime = new Date(endDate).getTime() - new Date(startDate).getTime();
    const gapDay = Math.ceil(gapTime / (1000 * 60 * 60 * 24));
    const countDay = Math.ceil((new Date().getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24));

    //일일 권장 독서량
    const leftPage = data.endPageNum - data.startPageNum; //수정 해야함
    const leftDay = gapDay - countDay;
    const pagePerDay = Math.ceil(leftPage / leftDay);


    return (
        <StyledBookBox>
            <div className="box-top">
                <p>{`${startDate} ~ ${endDate} (${gapDay}일)`}</p>
                <button>수정</button>
                <button>삭제</button>
            </div>
            <div className="main">
                <div className="chart">
                    <p>D {leftDay}</p>
                    <div>차트 56%</div>
                    <p>120 / {data.endPageNum} p</p>
                </div>
                <div className="contents">
                    <h2>{data.title}</h2>
                    <p>{data.author} | {data.publisher}</p>
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