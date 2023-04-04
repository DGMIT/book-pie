import BookBox from "./BookBox";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { Book } from "../../models/book.model";
import ErrorMsgBox from "../common/ErrorMsgBox";
import { getErrorMessage } from "../../lib/getErrorMessage";
import axiosInstance from "../../lib/axiosInstance";
import styled from "styled-components";

const StyledMsg = styled.div`
  text-align: center;
  color: var(--dark-gray);
  font-size: 16px;
`;

const BookList = () => {
  const [isError, setIsError] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string>("");
  const [bookList, setBookList] = useState<Book[]>();

  const getBookList = async () => {
    try {
      const response = await axiosInstance.get("/book");
      const data = response.data;
      setBookList(data);
    } catch (error) {
      const { response } = error as unknown as AxiosError;
      setIsError(true);
      setErrMsg(getErrorMessage(response?.status));
    }
  };

  useEffect(() => {
    getBookList();
  }, []);
  return (
    <>
      {isError && <ErrorMsgBox errMsg={errMsg} />}

      <ul>
        {bookList && Array.isArray(bookList) ?
          bookList.map((data: Book) => (
            <li key={data.bookId}>
              <BookBox data={data} />
            </li>
          )) : <StyledMsg>도서를 등록해주세요.</StyledMsg>}
      </ul>
    </>
  );
};

export default BookList;
