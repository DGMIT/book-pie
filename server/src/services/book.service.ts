import { injectable, inject } from "inversify";
import TYPES from "../constant/types";
import { Book, Response, BookListResponse, BookCreateRequest, BookResponse, BookUpdateRequest, DaysResponse } from "../models/book.model";
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
            WRT_DTHMS as 'writtenDatetime',
            UPDATE_DTHMS as 'updateDatetime',
            COALESCE((SELECT 
                MAX(BP_BR_LAST_READ_NUM) 
            FROM 
                BP_BOOK_REPORT 
            WHERE 
                BP_BOOK_REPORT.BP_BOOK_ID = BP_BOOK.BP_BOOK_ID AND BP_BOOK_REPORT.DEL_YN = 'N'
			), 0) as 'maxLastReadNum'
        FROM 
            BP_BOOK
        WHERE
            DEL_YN = 'N'
        ORDER BY 
            BP_BOOK_ID DESC;`;
        
        let result: Response | BookListResponse;
        try{
            let queryResult = await this.dbExecute.execute(queryStr);
            const [row, column] = queryResult;
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
        } catch {
            result = {
                result: 'ERROR'
            }
        }
        return result;
    }
    async getById(id): Promise<Response | BookListResponse> {
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
            WRT_DTHMS as 'writtenDatetime',
            UPDATE_DTHMS as 'updateDatetime',
            COALESCE((SELECT 
                MAX(BP_BR_LAST_READ_NUM) 
            FROM 
                BP_BOOK_REPORT 
            WHERE 
                BP_BOOK_REPORT.BP_BOOK_ID = BP_BOOK.BP_BOOK_ID AND BP_BOOK_REPORT.DEL_YN = 'N'
			), 0) as 'maxLastReadNum'
        FROM 
            BP_BOOK
        WHERE
            DEL_YN = 'N' AND BP_BOOK_ID='${id}'
        ;`;

        let result: Response | BookResponse;
        try{
            let queryResult = await this.dbExecute.execute(queryStr);
            const [row, column] = queryResult;
            
            if(!row || !Array.isArray(row) || !row.length) {
                result = {
                    result: 'HAVE_NO_DATA'
                }
            } else {
                result = {
                    result: 'OK',
                    bookData: row[0] as Book
                }
            }
            
        } catch {
            result = {
                result: 'ERROR'
            }
        }
        return result;
    }



    async create(reqBody: BookCreateRequest): Promise<Response> {
        const {
            title,
            author,
            publisher,
            startPageNum,
            endPageNum,
            startDate,
            endDate
        } = reqBody;
        
        const queryStr = 
        `INSERT INTO BP_BOOK
        (
            BP_BOOK_TITLE,
            ${author ? 'BP_BOOK_AUTHOR,' : ''}
            ${publisher ? 'BP_BOOK_PUBLISHER,' : ''}
            BP_BOOK_START_NUM,
            BP_BOOK_END_NUM,
            BP_BOOK_START_DT,
            BP_BOOK_END_DT
        )
        VALUES 
        (
            '${title}',
            ${author ? `'${author}',` : ''}
            ${publisher ? `'${publisher}',` : ''}
            '${startPageNum}',
            '${endPageNum}',
            '${startDate}',
            '${endDate}'
        );`;

        let result: Response;
        try {
            let queryResult = await this.dbExecute.execute(queryStr);
            result = {
                result: 'OK'
            }
        } catch {
            result = {
                result: 'ERROR'
            }
        }
        return result;
    }

    async update(id, reqBody: BookUpdateRequest): Promise<Response> {
        const {
            title,
            author,
            publisher,
            startPageNum,
            endPageNum,
            startDate,
            endDate
        } = reqBody;
        
        const queryStr = 
        `UPDATE
            BP_BOOK
        SET
            BP_BOOK_TITLE='${title}',
            ${author ? `BP_BOOK_AUTHOR='${author}',` : ''}
            ${publisher ? `BP_BOOK_PUBLISHER='${publisher}',` : ''}
            BP_BOOK_START_NUM='${startPageNum}',
            BP_BOOK_END_NUM='${endPageNum}',
            BP_BOOK_START_DT='${startDate}',
            BP_BOOK_END_DT='${endDate}',
            UPDATE_DTHMS=CURRENT_TIMESTAMP()
        WHERE
            BP_BOOK_ID='${id}';`;

        let result: Response;
        try {
            let queryResult = await this.dbExecute.execute(queryStr);
            result = {
                result: 'OK'
            }
        } catch {
            result = {
                result: 'ERROR'
            }
        }
        return result;
    }

    async delete(id): Promise<Response> {        
        const queryStr = 
        `UPDATE
            BP_BOOK
        SET
            DEL_YN='Y'
        WHERE
            BP_BOOK_ID='${id}';`;
        let result: Response;
        try {
            let queryResult = await this.dbExecute.execute(queryStr);
            result = {
                result: 'OK'
            }
        } catch {
            result = {
                result: 'ERROR'
            }
        }
        return result;
    }

    /** 연속 독서 일수 가져오는 API*/
    async getConsecutiveDays(): Promise<Response | DaysResponse> {    
        const queryStr = 
        `SELECT
            WRT_DTHMS 'writtenDatetime' 
        FROM
            BP_BOOK_REPORT
        ORDER BY
            WRT_DTHMS DESC;`;
        let result: Response | DaysResponse;
        try {
            let queryResult = await this.dbExecute.execute(queryStr);
            const [row, column] = queryResult;
            // console.log(row);
            if(!row || !Array.isArray(row) || !row.length) {
                result = {
                    result: 'HAVE_NO_DATA'
                }
            } else {
                const daysArr = row.map(data => data['writtenDatetime']);
                result = {
                    result: 'OK',
                    daysArr: daysArr
                }
            }
        } catch {
            result = {
                result: 'ERROR'
            }
        }
        return result;
    }
    
}
