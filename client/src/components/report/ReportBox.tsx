import styled from "styled-components";
import {
  Report,
  RequestCreateReport,
  RequestUpdateReport,
} from "../../models/report.model";
import { FormEvent, useState } from "react";
import { getDate } from "../../common/getDate";
import axios from "axios";
import { StyledInput, StyledTextarea } from "../../styled/StyledInput";
import { StyledMainBtn, StyledSubBtn } from "../../styled/StyledBtn";

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
        await axios.post("http://localhost:4000/report/", body);
        setIsError(false);
        alert("독후감 등록이 완료되었습니다.");
        window.location.reload();
      } else {
        //update
        const body: RequestUpdateReport = {
          lastReadPageNum: lastReadPage,
          contentText: contentText,
        };
        await axios.put(
          "http://localhost:4000/report/update/" + data.reportId,
          body
        );
        setIsError(false);
        setIsEditMode(false);
        window.location.reload();
      }
    } catch (error) {
      setIsError(true);
    }
  };

  const handleDelete = async () => {
    if (data && window.confirm("독후감을 삭제하시겠습니까?")) {
      try {
        await axios.put("http://localhost:4000/report/delete/" + data.reportId);
        setIsError(false);
        alert("독후감이 삭제되었습니다.");
        window.location.reload();
      } catch (error) {
        setIsError(true);
      }
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
              <StyledSubBtn onClick={() => setIsEditMode(false)}>취소</StyledSubBtn>
              <StyledMainBtn type="submit">수정 완료</StyledMainBtn>
            </>
          )}
        </div>
      </form>
    </StyledReportBox>
  );
};

export default ReportBox;
