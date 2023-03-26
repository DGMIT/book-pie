import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledReportBox = styled.div`
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
        .page {
            margin-bottom: 10px;
            input {
                width: 100px;
            }
        }
        .text {
            margin-bottom: 10px;
            textarea {
                width: 100%;
            }
        }
    }
    .button-box {
        text-align: right;
    }
`;

type Mode = {
    mode: 'edit' | 'readonly';
}

const ReportBox = ({mode}: Mode) => {
    return (
        <StyledReportBox>
            <div className="box-top">
                {/* <p>Today</p> */}
                <button>...</button>
            </div>
            <div className="main">
                <p>2023.02.23 (목)</p>
                <div className="page">
                    {mode === 'edit' ? <input value={123}/> : <span>123</span>}
                    <span> p 까지 완료 &#40;읽은 쪽수: 0p&#41;</span>
                </div>
                <div className="text">
                    {mode === 'edit' ? 
                    <textarea rows={5} value="타입스트립트의 기본 개념과 사용하면 좋은 점에 대해서 알게 되었다."/> 
                    : <p>타입스트립트의 기본 개념과 사용하면 좋은 점에 대해서 알게 되었다.</p>}
                </div>
            </div>
            <div className="button-box">
                {mode === 'edit' && <button><Link to='/report/1'>수정하기</Link></button>}
            </div>
        </StyledReportBox>
    )
}

export default ReportBox;