import styled from "styled-components";
import { Report, ReportCreateRequest } from "../../models/report.model";
import { FormEvent, useState } from "react";
import { getDate } from "../../common/getDate";
import axios from "axios";

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
                resize: none;
            }
        }
    }
    .button-box {
        text-align: right;
    }
`;

interface Props {
    bookId: string;
    data?: Report;
}

const ReportBox = ({ bookId, data }: Props) => {
    const [isError, setIsError] = useState<boolean>(false);
    const [isEditMode, setIsEditMode] = useState(!data ? true : false);
    const [lastReadPage, setLastReadPage] = useState<number>(
        !data ? 1 : data.lastReadPageNum
    );
    const [contentText, setContentText] = useState<string>(
        !data ? "" : data.contentText
    );

    const handleFetch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const body: ReportCreateRequest = {
            lastReadPageNum: lastReadPage,
            contentText: contentText,
        };

        //create
        if (!data) {
            axios
                .post("http://localhost:4000/report/" + bookId, body)
                .then((response) => {
                    const data = response.data;
                    if (data.result === "OK") {
                        setIsError(false);
                        alert("독후감 등록이 완료되었습니다.");
                        window.location.reload();
                    }
                })
                .catch(() => {
                    setIsError(true);
                });
        } else {
            //update
            axios
                .put(
                    "http://localhost:4000/report/update/" + data.bookReportId,
                    body
                )
                .then((response) => {
                    const data = response.data;
                    if (data.result === "OK") {
                        setIsError(false);
                        setIsEditMode(false);
                        window.location.reload();
                    }
                })
                .catch(() => {
                    setIsError(true);
                });
        }
    };

    const handleDelete = () => {
        if (window.confirm("독후감을 삭제하시겠습니까?")) {
            axios
                .put("http://localhost:4000/report/delete/" + data?.bookReportId)
                .then(() => {
                    setIsError(false);
                    alert("독후감이 삭제되었습니다.");
                    window.location.reload();
                })
                .catch(() => {
                    setIsError(true);
                });
        }
    };

    return (
        <StyledReportBox>
            <div className="box-top">
                {!isEditMode && (
                    <button onClick={() => setIsEditMode(true)}>수정</button>
                )}
                <button onClick={handleDelete}>삭제</button>
            </div>
            <form className="main" onSubmit={handleFetch}>
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
                            type="number"
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
                                placeholder="최소 10자 이상 작성이 필요합니다."
                                onChange={(e) => setContentText(e.target.value)}
                            />
                            <span>{contentText.length + " / 500"}</span>
                        </>
                    ) : (
                        <p>{data?.contentText}</p>
                    )}
                </div>
                <div className="button-box">
                    {!data && (
                        <button type="submit" >
                            등록하기
                        </button>
                    )}
                    {isEditMode && data && (
                        <>
                            <button onClick={() => setIsEditMode(false)}>
                                취소
                            </button>
                            <button type="submit" >
                                수정 완료
                            </button>
                        </>
                    )}
                </div>
            </form>
        </StyledReportBox>
    );
};

export default ReportBox;
