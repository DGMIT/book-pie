import styled from "styled-components";
import { Link } from "react-router-dom";

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

const BookBox = () => {
    return (
        <StyledBookBox>
            <div className="box-top">
                <p>23.02.13 ~ 23.03.12 (주말 포함)</p>
                <button>...</button>
            </div>
            <div className="main">
                <div className="chart">
                    <p>D-12</p>
                    <div>차트 56%</div>
                    <p>120 / 243 p</p>
                </div>
                <div className="contents">
                    <h2>이펙티브 타입스크립트</h2>
                    <p>댄 밴더캄 | 프로그래밍 인사이트</p>
                    <div>
                        <p>21일차</p>
                        <div>
                            <p>14일 연속 성공🔥🔥</p>
                            <p>✅ 성공 18일  ❌ 실패 3일</p>
                        </div>
                        <div>
                            <p>일일 권장 독서량   7p</p>
                            <p>남은 페이지 / 남은 일수 =  84p / 12일</p>
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