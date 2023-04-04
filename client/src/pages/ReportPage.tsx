import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookBox from "../components/book/BookBox";
import ReportList from "../components/report/ReportList";
import { Book } from "../models/book.model";
import { getErrorMessage } from "../lib/getErrorMessage";
import ErrorMsgBox from "../components/common/ErrorMsgBox";
import axiosInstance from "../lib/axiosInstance";

const ReportPage = () => {
  const [isError, setIsError] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string>("");
  const { bookId } = useParams();
  const [bookData, setBookData] = useState<Book>();

  //도서 데이터 가져오기, api 호출부 컴포넌트에서 분리
  const getBookData = async () => {
    try {
      const response = await axiosInstance.get("/book/" + bookId);
      const data = response.data;
      setBookData(data);
      setIsError(false);
    } catch (error) {
      const { response } = error as unknown as AxiosError;
      setIsError(true);
      setErrMsg(getErrorMessage(response?.status));
    }
  };

  useEffect(() => {
    getBookData();
  }, []);

  return (
    <>
      {isError && <ErrorMsgBox errMsg={errMsg} />}
      {bookData && (
        <>
          <BookBox data={bookData} />
          {bookId && (
            <ReportList bookId={bookId} endPageNum={bookData.endPageNum} />
          )}
        </>
      )}
    </>
  );
};

export default ReportPage;
