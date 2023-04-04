import styled from "styled-components";
import {
  Report,
  RequestCreateReport,
  RequestUpdateReport,
} from "../../models/report.model";
import { FormEvent, useState } from "react";
import { getDate } from "../../lib/getDate";
import axios, { AxiosError } from "axios";
import { StyledInput, StyledTextarea } from "../../styled/StyledInput";
import { StyledMainBtn, StyledSmallDeleteBtn, StyledSmallSubBtn, StyledSubBtn } from "../../styled/StyledBtn";
import ErrorMsgBox from "../common/ErrorMsgBox";
import { getErrorMessage } from "../../lib/getErrorMessage";
import axiosInstance from "../../lib/axiosInstance";

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
  endPageNum: number;
}

const ReportBox = ({ bookId, data, endPageNum }: Props) => {
  const [isError, setIsError] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string>("");
  const [isEditMode, setIsEditMode] = useState(!data ? true : false);
  const [lastReadPage, setLastReadPage] = useState<number>(
    !data ? 1 : data.lastReadPageNum
  );
  const [contentText, setContentText] = useState<string>(
    !data ? "" : data.contentText
  );

  const handleFetch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      //create
      if (!data) {
        const body: RequestCreateReport = {
          lastReadPageNum: lastReadPage,
          contentText: contentText,
          bookId: Number(bookId),
        };
        await axiosInstance.post("/report/", body);
        setIsError(false);
        alert("독후감 등록이 완료되었습니다.");
        window.location.reload();
      } else {
        //update
        const body: RequestUpdateReport = {
          lastReadPageNum: lastReadPage,
          contentText: contentText,
        };
        await axiosInstance.put(
          "/report/update/" + data.reportId,
          body
        );
        setIsError(false);
        setIsEditMode(false);
        window.location.reload();
      }
    } catch (error) {
      const { response } = error as unknown as AxiosError;
      setIsError(true);
      setErrMsg(getErrorMessage(response?.status));
    }
  };

  const handleDelete = async () => {
    if (data && window.confirm("독후감을 삭제하시겠습니까?")) {
      try {
        await axiosInstance.put("/report/delete/" + data.reportId);
        setIsError(false);
        alert("독후감이 삭제되었습니다.");
        window.location.reload();
      } catch (error) {
        const { response } = error as unknown as AxiosError;
        setIsError(true);
        setErrMsg(getErrorMessage(response?.status));
      }
    }
  };

  return (
    <>
      {" "}
      {isError && <ErrorMsgBox errMsg={errMsg} />}
      <StyledReportBox>
        <div className="box-top">
          {!isEditMode && (
            <StyledSmallSubBtn onClick={() => setIsEditMode(true)}>수정</StyledSmallSubBtn>
          )}
          <StyledSmallDeleteBtn onClick={handleDelete}>삭제</StyledSmallDeleteBtn>
        </div>
        <form className="main" onSubmit={handleFetch}>
          {data ? (
            <p>{getDate(data.writtenDatetime)}</p>
          ) : (
            <p>{getDate()} 오늘</p>
          )}
          <div className="page">
            {isEditMode ? (
              <StyledInput
                value={lastReadPage}
                required
                type="number"
                min={1}
                max={endPageNum}
                onChange={(e) => setLastReadPage(Number(e.target.value))}
              />
            ) : (
              <span>{data?.lastReadPageNum}</span>
            )}
            <span> p 까지 완료</span>
          </div>
          <div className="text">
            {isEditMode ? (
              <StyledTextarea>
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
              </StyledTextarea>
            ) : (
              <p>{data?.contentText}</p>
            )}
          </div>
          <div className="button-box">
            {!data && <StyledMainBtn type="submit">등록하기</StyledMainBtn>}
            {isEditMode && data && (
              <>
                <StyledSubBtn onClick={() => setIsEditMode(false)}>
                  취소
                </StyledSubBtn>
                <StyledMainBtn type="submit">수정 완료</StyledMainBtn>
              </>
            )}
          </div>
        </form>
      </StyledReportBox>
    </>
  );
};

export default ReportBox;
