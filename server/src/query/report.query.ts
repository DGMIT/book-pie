import { QueryInfo } from "../models/transaction.model";

export enum ReportQueryId {
  getReportList,
  getReport,
  createReport,
  updateReport,
  deleteReport,
  getConsecutiveDays,
}

export const ReportQuery = (
  queryId: ReportQueryId,
  request: any = {}
): QueryInfo => {
  const queryInfo: QueryInfo = {
    queryStr: "",
    queryParams: [],
  };

  const queryStr: string[] = [];
  const queryParams: any[] = [];

  switch (queryId) {
    case ReportQueryId.getReportList:
      queryStr.push(`
      SELECT
        R.BP_BR_ID AS 'reportId',
        R.BP_BR_LAST_READ_NUM AS 'lastReadPageNum',
        R.BP_BR_CONTENT_TEXT AS 'contentText',
        R.WRT_DTHMS AS 'writtenDatetime',
        R.UPDATE_DTHMS AS 'updateDatetime',
        R.BP_BOOK_ID AS 'bookId'
      FROM 
        BP_BOOK_REPORT R
      WHERE
        R.BP_BOOK_ID = ? AND R.DEL_YN = 'N'
      ORDER BY 
        R.BP_BR_ID DESC
      `);
      queryParams.push(request);
      break;

    case ReportQueryId.getReport:
      queryStr.push(`
        SELECT
          R.BP_BR_ID AS 'reportId',
          R.BP_BR_LAST_READ_NUM AS 'lastReadPageNum',
          R.BP_BR_CONTENT_TEXT AS 'contentText',
          R.WRT_DTHMS AS 'writtenDatetime',
          R.UPDATE_DTHMS AS 'updateDatetime',
          R.BP_BOOK_ID AS 'bookId'
        FROM 
          BP_BOOK_REPORT R
        WHERE
          R.DEL_YN = 'N' AND R.BP_BR_ID = ?
      `);
      queryParams.push(request);
      break;

    case ReportQueryId.createReport:
      queryStr.push(`
        INSERT INTO BP_BOOK_REPORT
        (
          BP_BR_LAST_READ_NUM,
          BP_BR_CONTENT_TEXT,
          BP_BOOK_ID
        )
        VALUES (?, ?, ?)
      `);
      queryParams.push(request.lastReadPageNum);
      queryParams.push(request.contentText);
      queryParams.push(request.bookId);
      break;

    case ReportQueryId.updateReport:
      queryStr.push(`
        UPDATE
          BP_BOOK_REPORT R
        SET
          R.BP_BR_LAST_READ_NUM = ?,
          R.BP_BR_CONTENT_TEXT = ?,
          R.UPDATE_DTHMS = CURRENT_TIMESTAMP()
        WHERE
          BP_BR_ID = ?
      `);
      queryParams.push(request.lastReadPageNum);
      queryParams.push(request.contentText);
      queryParams.push(request.reportId);
      break;

    case ReportQueryId.deleteReport:
      queryStr.push(`
        UPDATE
          BP_BOOK_REPORT
        SET
          DEL_YN = 'Y'
        WHERE
          BP_BR_ID = ?
      `);
      queryParams.push(request);
      break;

    case ReportQueryId.getConsecutiveDays:
      queryStr.push(`
          SELECT
            R.WRT_DTHMS AS 'writtenDatetime' 
          FROM
            BP_BOOK_REPORT R
          ORDER BY
            R.WRT_DTHMS DESC
        `);
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
