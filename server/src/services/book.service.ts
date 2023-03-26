import { injectable, inject } from "inversify";
import TYPES from "../constant/types";
import * as mysql from "mysql2/promise";
import { Response, BookListResponse } from "../models/book.model";
import { Book } from "../models/book.model";


@injectable()
export class BookService {
    async getList(): Promise<Response | BookListResponse> {
        // 데이터베이스 연결 설정
        const connection = await mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "localmysql1234",
            database: "BOOK_PIE",
        });

        // 데이터베이스 연결
        await connection.connect();

        // 데이터베이스 쿼리 실행
        const queryStr = 
        `SELECT
            BP_BOOK_ID as 'bookId',
            BP_BOOK_TITLE as 'title',
            BP_BOOK_AUTHOR as 'author',
            BP_BOOK_PUBLISHER as 'publisher',
            BP_BOOK_START_NUM as 'startPageNum',
            BP_BOOK_END_NUM as 'endPageNum',
            BP_BOOK_START_DT as 'startDate',
            BP_BOOK_END_DT as 'endDate',
            BP_BOOK_WEEKEND_INC_YN as 'weekendIncludeYN',
            WRT_DTHMS as 'writtenDatetime',
            UPDATE_DTHMS as 'updateDatetime'
        FROM 
            BP_BOOK
        WHERE
            DEL_YN = 'N';`;
        let queryResult = await connection.query(queryStr);
        const [row, column] = queryResult;
        // console.log(row);

        let result: Response | BookListResponse;
        if(!row || !Array.isArray(row) || !row.length) {
            result = {
                result: 'HAVE_NO_DATA'
            }
        } else {
            result = {
                result: 'OK',
                totalCount: row.length,
                bookList: row as Book[]
            }
        }

        // 데이터베이스 연결 종료
        connection.end();

        return result;
    }
}
