import BookBox from "./BookBox";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { Book } from "../../models/book.model";
import ErrorMsgBox from "../common/ErrorMsgBox";
import { getErrorMessage } from "../../lib/getErrorMessage";
import axiosInstance from "../../lib/axiosInstance";

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
        {bookList &&
          bookList.map((data: Book) => (
            <li key={data.bookId}>
              <BookBox data={data} />
            </li>
          ))}
      </ul>
    </>
  );
};

export default BookList;
