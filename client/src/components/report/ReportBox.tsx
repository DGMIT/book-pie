import styled from "styled-components";
import { Report } from "../../models/report.model";
import { useState } from "react";
import { getDate } from "../../common/getDate";

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

interface Props {
    data?: Report;
}

const ReportBox = ({ data }: Props) => {
    const [isEditMode, setIsEditMode] = useState(!data ? true : false);
    const [lastReadPage, setLastReadPage] = useState<number>(1);
    const [contentText, setContentText] = useState<string>("");
    return (
        <StyledReportBox>
            <div className="box-top">
                {!isEditMode && <button onClick={() => setIsEditMode(true)}>수정</button>}
                <button>삭제</button>
            </div>
            <div className="main">
                {data ? (
                    <p>{getDate(data.writtenDatetime)}</p>
                ) : (
                    <p>{getDate()} 오늘</p>
                )}
                <div className="page">
                    {isEditMode ? (
                        <input
                            value={lastReadPage}
                            required
                            min={1}
                            onChange={(e) =>
                                setLastReadPage(Number(e.target.value))
                            }
                        />
                    ) : (
                        <span>{data?.lastReadPageNum}</span>
                    )}
                    <span> p 까지 완료</span>
                </div>
                <div className="text">
                    {isEditMode ? (
                        <>
                        <textarea
                            required
                            minLength={10}
                            maxLength={500}
                            rows={5}
                            value={contentText}
                            onChange={(e) => setContentText(e.target.value)}
                            />
                        <span>{contentText.length + ' / 500'}</span>
                        </>
                        
                    ) : (
                        <p>{data?.contentText}</p>
                    )}
                </div>
            </div>
            <div className="button-box">
                {!data && <button>등록하기</button>}
                {isEditMode && data && <button onClick={() => setIsEditMode(false)}>수정 완료</button>}
            </div>
        </StyledReportBox>
    );
};

export default ReportBox;
