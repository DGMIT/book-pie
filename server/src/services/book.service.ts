import { injectable, inject } from "inversify";
import TYPES from "../constant/types";
import * as mysql from "mysql2/promise";
import { Response, BookListResponse } from "../models/book.model";
import { Book } from "../models/book.model";
import { DBexecute } from "./dbExecute.service";


@injectable()
export class BookService {
    constructor(
        @inject(TYPES.DBexecute) private dbExecute: DBexecute
    ) {}
    async getList(): Promise<Response | BookListResponse> {
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

        let queryResult = await this.dbExecute.execute(queryStr);

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


        return result;
    }

    // async getById(id: number): Promise<Book> {

    // }
}
