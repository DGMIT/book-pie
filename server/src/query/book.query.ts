import { QueryInfo } from "../models/transaction.model";

export enum BookQueryId {
  getBookList,
  getBook,
  createBook,
  updateBook,
  deleteBook,
}

export const BookQuery = (
  queryId: BookQueryId,
  request: any = {}
): QueryInfo => {
  const queryInfo: QueryInfo = {
    queryStr: "",
    queryParams: [],
  };

  const queryStr: string[] = [];
  const queryParams: any[] = [];

  switch (queryId) {
    case BookQueryId.getBookList:
      queryStr.push(`
        SELECT
          B.BP_BOOK_ID AS 'bookId',
          B.BP_BOOK_TITLE AS 'title',
          B.BP_BOOK_AUTHOR AS 'author',
          B.BP_BOOK_PUBLISHER AS 'publisher',
          B.BP_BOOK_START_NUM AS 'startPageNum',
          B.BP_BOOK_END_NUM AS 'endPageNum',
          B.BP_BOOK_START_DT AS 'startDate',
          B.BP_BOOK_END_DT AS 'endDate',
          B.WRT_DTHMS AS 'writtenDatetime',
          B.UPDATE_DTHMS AS 'updateDatetime',
          IFNULL(
            (
              SELECT 
                MAX(R.BP_BR_LAST_READ_NUM) 
              FROM 
                BP_BOOK_REPORT R
              WHERE 
                R.BP_BOOK_ID = B.BP_BOOK_ID 
                AND
                R.DEL_YN = 'N'
            ), 0) AS 'maxLastReadNum'
        FROM 
          BP_BOOK B
        WHERE
            B.DEL_YN = 'N'
        ORDER BY 
            B.BP_BOOK_ID DESC
      `);
      break;

    case BookQueryId.getBook:
      queryStr.push(`
        SELECT
          B.BP_BOOK_ID AS 'bookId',
          B.BP_BOOK_TITLE AS 'title',
          B.BP_BOOK_AUTHOR AS 'author',
          B.BP_BOOK_PUBLISHER AS 'publisher',
          B.BP_BOOK_START_NUM AS 'startPageNum',
          B.BP_BOOK_END_NUM AS 'endPageNum',
          B.BP_BOOK_START_DT AS 'startDate',
          B.BP_BOOK_END_DT AS 'endDate',
          B.WRT_DTHMS AS 'writtenDatetime',
          B.UPDATE_DTHMS AS 'updateDatetime',
          IFNULL(
            (
              SELECT 
                MAX(R.BP_BR_LAST_READ_NUM) 
              FROM 
                BP_BOOK_REPORT R
              WHERE 
                R.BP_BOOK_ID = B.BP_BOOK_ID 
                AND
                R.DEL_YN = 'N'
            ), 0) AS 'maxLastReadNum'
        FROM 
          BP_BOOK B
        WHERE
          B.DEL_YN = 'N' AND B.BP_BOOK_ID = ?
      `);
      queryParams.push(request);
      break;

    case BookQueryId.createBook:
      queryStr.push(`
        INSERT INTO BP_BOOK
        (
          BP_BOOK_TITLE,
          BP_BOOK_AUTHOR,
          BP_BOOK_PUBLISHER,
          BP_BOOK_START_NUM,
          BP_BOOK_END_NUM,
          BP_BOOK_START_DT,
          BP_BOOK_END_DT
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `);
      queryParams.push(request.title);
      queryParams.push(request.author);
      queryParams.push(request.publisher);
      queryParams.push(request.startPageNum);
      queryParams.push(request.endPageNum);
      queryParams.push(request.startDate);
      queryParams.push(request.endDate);
      break;

    case BookQueryId.updateBook:
      queryStr.push(`
        UPDATE BP_BOOK B
        SET 
          B.BP_BOOK_TITLE = ?, 
          B.BP_BOOK_AUTHOR =? ,
          B.BP_BOOK_PUBLISHER = ?,
          B.BP_BOOK_START_NUM = ?, 
          B.BP_BOOK_END_NUM = ?, 
          B.BP_BOOK_START_DT = ?, 
          B.BP_BOOK_END_DT = ?, 
          B.UPDATE_DTHMS = CURRENT_TIMESTAMP()
        WHERE B.BP_BOOK_ID = ?
      `);
      queryParams.push(request.title);
      queryParams.push(request.author);
      queryParams.push(request.publisher);
      queryParams.push(request.startPageNum);
      queryParams.push(request.endPageNum);
      queryParams.push(request.startDate);
      queryParams.push(request.endDate);
      queryParams.push(request.bookId);
      break;

    case BookQueryId.deleteBook:
      queryStr.push(`
        UPDATE
          BP_BOOK B
        SET
          B.DEL_YN='Y'
        WHERE
          B.BP_BOOK_ID = ?
      `);
      queryParams.push(request);
      break;

    default:
      break;
  }

  if (queryStr.length > 0) {
    queryInfo.queryStr = queryStr.join(" ");
    queryInfo.queryParams = queryParams;
  }

  return queryInfo;
};
