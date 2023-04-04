import { AxiosError } from "axios";
import { FormEvent, useState } from "react";
import { Book, RequestUpdateBook } from "../../models/book.model";
import moment from "moment";
import Modal from "react-modal";
import styled from "styled-components";
import { StyledMainBtn, StyledSubBtn } from "../../styled/StyledBtn";
import { StyledInput } from "../../styled/StyledInput";
import { getErrorMessage } from "../../lib/getErrorMessage";
import ErrorMsgBox from "../common/ErrorMsgBox";
import axiosInstance from "../../lib/axiosInstance";

const customModalStyles = {
  content: {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "700px",
    height: "550px",
  },
  overlay: {
    background: "rgba(0, 0, 0, 0.5)",
  },
};

const StyledModalContainer = styled.div`
  width: 600px;
  margin: 0 auto;

  > h2 {
    margin-bottom: 20px;
  }

  .label {
    display: inline-block;
    margin: 10px 0;
    line-height: 40px;
    width: 100px;
    color: var(--dark-gray);
  }

  .required-icon,
  .error-msg {
    font-size: 14px;
    color: var(--error-color);
  }

  .container {
    display: flex;
  }

  .data-box {
    margin-left: 100px;
    font-size: 14px;
    color: var(--dark-gray);
    line-height: 1.6;
  }

  .button-box {
    margin-top: 20px;
    text-align: right;
  }
`;

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
  data?: Book;
}

const BookModal = ({ modalIsOpen, setModalIsOpen, data }: Props) => {
  const [isError, setIsError] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string>("");
  const [startPageNum, setStartPageNum] = useState(data?.startPageNum || 1);
  const [endPageNum, setEndPageNum] = useState(data?.endPageNum || 2);
  const [pageErrMsgShow, setPageErrMsgShow] = useState(false);
  const [startDate, setStartDate] = useState(
    data?.startDate
      ? data.startDate.slice(0, 10)
      : moment().format("yyyy-MM-DD")
  );
  const [endDate, setEndDate] = useState(
    data?.endDate
      ? data.endDate.slice(0, 10)
      : moment().add(1, "months").format("yyyy-MM-DD")
  );
  const [dateErrMsgShow, setDateErrMsgShow] = useState(false);
  const totalPage = endPageNum - startPageNum + 1;
  const totalPeriod = moment(endDate).diff(moment(startDate), "days") + 1;

  /** 유효성 검사 */
  const validatePageInput = () => {
    //시작페이지 <= 종료페이지 이여야 한다.
    if (totalPage >= 2) {
      setPageErrMsgShow(false);
    } else {
      setPageErrMsgShow(true);
      return false;
    }

    return true;
  };
  const validateDateInput = () => {
    //시작일 < 종료일 이어야 한다.
    if (totalPeriod >= 2) {
      setDateErrMsgShow(false);
    } else {
      setDateErrMsgShow(true);
      return false;
    }

    return true;
  };

  const handleFetch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validatePageInput() || !validateDateInput()) return;

    const formData = new FormData(e.currentTarget);

    const title = String(formData.get("title"));
    const author = String(formData.get("author"));
    const publisher = String(formData.get("publisher"));
    const startPageNum = Number(formData.get("startPageNum"));
    const endPageNum = Number(formData.get("endPageNum"));
    const startDate = String(formData.get("startDate"));
    const endDate = String(formData.get("endDate"));

    const body: RequestUpdateBook = {
      title,
      author,
      publisher,
      startPageNum,
      endPageNum,
      startDate,
      endDate,
    };
    try {
      //create
      if (!data) {
        await axiosInstance.post("/book", body);
        // console.log(response)
        setIsError(false);
        alert("도서 등록이 완료되었습니다.");
        setModalIsOpen(false);
        window.location.replace("/");
      } else {
        //update
        await axiosInstance.put(
          "/book/update/" + data.bookId,
          body
        );
        setIsError(false);
        alert("도서 수정이 완료되었습니다.");
        setModalIsOpen(false);
        window.location.reload();
      }
    } catch (error) {
      const { response } = error as unknown as AxiosError;
      setIsError(true);
      setErrMsg(getErrorMessage(response?.status));
    }
  };

  return (
    <>
      {isError && <ErrorMsgBox errMsg={errMsg} />}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={customModalStyles}
        ariaHideApp={false}
      >
        <StyledModalContainer>
          <h2>책 {data ? "수정하기" : "등록하기"}</h2>
          <form onSubmit={handleFetch}>
            <div>
              <label htmlFor="book-title" className="label">
                책 제목<span className="required-icon">*</span>
              </label>
              <StyledInput
                width={"500px"}
                id="book-title"
                name="title"
                required
                minLength={1}
                maxLength={200}
                defaultValue={data ? data.title : ""}
              />
            </div>
            <div>
              <label htmlFor="book-author" className="label">
                저자
              </label>
              <StyledInput
                width={"500px"}
                id="book-author"
                name="author"
                minLength={1}
                maxLength={100}
                defaultValue={data ? data.author : ""}
              />
            </div>
            <div>
              <label htmlFor="book-publisher" className="label">
                출판사
              </label>
              <StyledInput
                width={"500px"}
                id="book-publisher"
                name="publisher"
                minLength={1}
                maxLength={100}
                defaultValue={data ? data.publisher : ""}
              />
            </div>
            <div className="container page-box">
              <div className="label">
                페이지<span className="required-icon">*</span>
              </div>
              <div>
                <div>
                  <label htmlFor="book-start-page-num">시작 페이지 </label>
                  <StyledInput
                    type="number"
                    id="book-start-page-num"
                    name="startPageNum"
                    required
                    min={1}
                    max={60000}
                    value={startPageNum}
                    onChange={(e) => {
                      setStartPageNum(Number(e.target.value));
                      validatePageInput();
                    }}
                  />
                  {" p ~ "}
                  <label htmlFor="book-end-page-num">마지막 페이지 </label>
                  <StyledInput
                    type="number"
                    id="book-end-page-num"
                    name="endPageNum"
                    required
                    min={2}
                    max={60000}
                    value={endPageNum}
                    onChange={(e) => {
                      setEndPageNum(Number(e.target.value));
                      validatePageInput();
                    }}
                  />
                  {" p"}
                </div>
                {pageErrMsgShow && (
                  <p className="error-msg">
                    마지막 페이지는 시작 페이지 보다 커야합니다.
                  </p>
                )}
              </div>
            </div>
            <div className="container period-box">
              <div className="label">
                기간<span className="required-icon">*</span>
              </div>
              <div>
                <label htmlFor="book-start-date-num">시작일 </label>
                <StyledInput
                  type="date"
                  id="book-start-date-num"
                  name="startDate"
                  required
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                {" ~"}
                <label htmlFor="book-end-date-num"> 종료일 </label>
                <StyledInput
                  type="date"
                  id="book-end-date-num"
                  name="endDate"
                  required
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
              {dateErrMsgShow && (
                <p className="error-msg">죵료일은 시작일 보다 커야합니다.</p>
              )}
            </div>
            <div className="data-box">
              <div>
                <div>총페이지: {totalPage}p</div>
                <div>총 기간: {totalPeriod}일</div>
                <div>
                  일일 권장 독서량: {Math.ceil(totalPage / totalPeriod)}p
                </div>
                <span>
                  총 페이지 / 기간 = {totalPage} p / {totalPeriod} 일 ={" "}
                  {Math.ceil(totalPage / totalPeriod)}p (반올림)
                </span>
              </div>
            </div>
            <div className="button-box">
              <StyledSubBtn type="reset" onClick={() => setModalIsOpen(false)}>
                취소
              </StyledSubBtn>
              <StyledMainBtn type="submit">
                {data ? "수정" : "등록"}
              </StyledMainBtn>
            </div>
          </form>
        </StyledModalContainer>
      </Modal>
    </>
  );
};

export default BookModal;
