import styled from "styled-components";
import { Link } from "react-router-dom";
import { Book } from "../../models/book.model";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import BookModal from "./BookModal";
import { useLocation } from "react-router-dom";
import moment from "moment";
import { StyledBox } from "../../styled/StyledBox";
import { StyledMainLinkBtn, StyledSmallDeleteBtn, StyledSmallSubBtn } from "../../styled/StyledBtn";
import { getErrorMessage } from "../../lib/getErrorMessage";
import ErrorMsgBox from "../common/ErrorMsgBox";
import axiosInstance from "../../lib/axiosInstance";

const StyledBookBox = styled(StyledBox)`
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
  .chart-box {
    margin-right: 30px;
    width: 15%;
    text-align: center;
  }
  .contents-box {
    flex: 1;
    .data {
      height: 70px;
    }
  }
  .button-box {
    text-align: right;
  }
`;

const StyledDonutChart = styled.div<{ chartPercentage: number }>`
  --chartPercentage: ${(props) => '"' + props.chartPercentage + '%"'};
  --chartDeg: ${(props) => Math.round(props.chartPercentage * 3.6) + "deg"};
  width: 100px;
  height: 100px;
  display: inline-block;

  .chart {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    transition: 0.3s;
    background: lightgray;
    display: inline-block;
  }

  .chart:after {
    content: var(--chartPercentage);
    text-align: center;
    line-height: 60px;
    background: #fff; /* 백그라운드 컬러로 중앙가리기 */
    position: absolute;
    top: 50%;
    left: 50%;
    width: 60%;
    height: 60%; /* 도넛의 너비 설정 */
    border-radius: 50%;
    transform: translate(-50%, -50%);
  }
  .chart-bar {
    width: inherit;
    height: inherit;
    border-radius: 50%;
    background: conic-gradient(
      var(--light-point-color) var(--chartDeg),
      var(--light-gray) var(--chartDeg)
    ); /* 차트 설정 */
  }
`;

const BookBox = ({ data }: { data: Book }) => {
  const [isError, setIsError] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string>("");
  const location = useLocation();
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const bookId = data.bookId;
  const startDate = data.startDate.slice(0, 10);
  const endDate = data.endDate.slice(0, 10);
  const totalPeriod = moment(endDate).diff(moment(startDate), "days") + 1;
  const countDay = moment().diff(moment(startDate), "days") + 1;
  const chartPercentage = Math.round(
    (data.maxLastReadNum / data.endPageNum) * 100
  );

  //일일 권장 독서량
  const leftPage = data.endPageNum - data.maxLastReadNum; //수정 해야함
  const leftDay = totalPeriod - countDay;
  const pagePerDay = Math.ceil(leftPage / leftDay);

  const handleUpdate = () => {
    setModalIsOpen(true);
  };

  const handleDelete = async () => {
    if (window.confirm("도서를 삭제하시겠습니까?")) {
      try {
        await axiosInstance.put("/book/delete/" + bookId);
        setIsError(false);
        alert("도서가 삭제되었습니다.");
        window.location.reload();
      } catch (error) {
        const { response } = error as unknown as AxiosError;
        setIsError(true);
        setErrMsg(getErrorMessage(response?.status));
      }
    }
  };

  const validateReadBtn = () => {
    if (moment().diff(moment(startDate), "days") < 0) return false;
    // if (moment().diff(moment(endDate), "days") > 0) return false;
    return true;
  };

  return (
    <>
      {isError && <ErrorMsgBox errMsg={errMsg} />}
      <StyledBookBox>
        <div className="box-top">
          <p>{`${startDate} ~ ${endDate} (${totalPeriod}일)`}</p>
          <StyledSmallSubBtn onClick={handleUpdate}>수정</StyledSmallSubBtn>
          <BookModal
            modalIsOpen={modalIsOpen}
            setModalIsOpen={setModalIsOpen}
            data={data}
          />
          <StyledSmallDeleteBtn onClick={handleDelete}>삭제</StyledSmallDeleteBtn>
        </div>
        <div className="main">
          <div className="chart-box">
            <p>{leftDay >= 0 ? "D-" + leftDay : "D+" + Math.abs(leftDay)}</p>
            <StyledDonutChart chartPercentage={chartPercentage}>
              <div className="chart">
                <div className="chart-bar" data-deg={chartPercentage}></div>
              </div>
            </StyledDonutChart>
            <p>
              {data.maxLastReadNum} / {data.endPageNum} p
            </p>
          </div>
          <div className="contents-box">
            <h2>{data.title}</h2>
            <p>{`${data.author ? data.author : ""}${
              data.author && data.publisher ? " | " : ""
            }${data.publisher ? data.publisher : ""}`}</p>
            <div className="data">
              {validateReadBtn() ? (
                <>
                  <p>{countDay}일차</p>
                  <div>
                    <p>일일 권장 독서량 {pagePerDay}p</p>
                    <p>
                      남은 페이지 / 남은 일수 = {leftPage}p / {leftDay}일
                    </p>
                  </div>
                </>
              ) : (
                <div>독후감 작성 기간이 아닙니다.</div>
              )}
            </div>
            {location.pathname.indexOf("/report") === -1 ? (
              <StyledMainLinkBtn
                className={`button-box${validateReadBtn() ? "" : " disabled"}`}
              >
                <Link to={"/report/" + bookId}>독서하기</Link>
              </StyledMainLinkBtn>
            ) : null}
          </div>
        </div>
      </StyledBookBox>
    </>
  );
};

export default BookBox;
