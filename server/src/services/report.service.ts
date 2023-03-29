import { injectable, inject } from "inversify";
import TYPES from "../constant/types";
import { Report, Response, ReportListResponse, ReportCreateRequest, ReportResponse, ReportUpdateRequest } from "../models/report.model";
import { DBexecute } from "./dbExecute.service";


@injectable()
export class ReportService {
    constructor(
        @inject(TYPES.DBexecute) private dbExecute: DBexecute
    ) {}
    async getList(bookId): Promise<Response | ReportListResponse> {
        const queryStr = 
        `SELECT
            BP_BR_ID as 'bookReportId',
            BP_BR_LAST_READ_NUM as 'lastReadPageNum',
            BP_BR_CONTENT_TEXT as 'contentText',
            WRT_DTHMS as 'writtenDatetime',
            UPDATE_DTHMS as 'updateDatetime',
            BP_BOOK_ID as 'bookId'
        FROM 
            BP_BOOK_REPORT
        WHERE
            BP_BOOK_ID = '${bookId}' AND DEL_YN = 'N'
        ORDER BY 
            BP_BR_ID DESC;`;
        
        let result: Response | ReportListResponse;
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
                    reportList: row as Report[]
                }
            }
        } catch {
            result = {
                result: 'ERROR'
            }
        }
        return result;
    }

    async getById(id): Promise<Response | ReportListResponse> {
        const queryStr = 
        `SELECT
            BP_BR_ID as 'bookReportId',
            BP_BR_LAST_READ_NUM as 'lastReadPageNum',
            BP_BR_CONTENT_TEXT as 'contentText',
            WRT_DTHMS as 'writtenDatetime',
            UPDATE_DTHMS as 'updateDatetime',
            BP_BOOK_ID as 'bookId'
        FROM 
            BP_BOOK_REPORT
        WHERE
            DEL_YN = 'N' AND BP_BR_ID='${id}'
        ;`;

        let result: Response | ReportResponse;
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
                    reportData: row[0] as Report
                }
            }
            
        } catch {
            result = {
                result: 'ERROR'
            }
        }
        return result;
    }



    async create(bookId, reqBody: ReportCreateRequest): Promise<Response> {
        const {
            lastReadPageNum,
            contentText,
        } = reqBody;

        const queryStr = 
        `INSERT INTO BP_BOOK_REPORT
        (
            BP_BR_LAST_READ_NUM,
            BP_BR_CONTENT_TEXT,
            BP_BOOK_ID
        )
        VALUES 
        (
            '${lastReadPageNum}',
            '${contentText}',
            '${bookId}'
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

    async update(id, reqBody: ReportUpdateRequest): Promise<Response> {
        const {
            lastReadPageNum,
            contentText
        } = reqBody;

        const queryStr = 
        `UPDATE
            BP_BOOK_REPORT
        SET
            BP_BR_LAST_READ_NUM='${lastReadPageNum}',
            BP_BR_CONTENT_TEXT='${contentText}',
            UPDATE_DTHMS=CURRENT_TIMESTAMP()
        WHERE
            BP_BR_ID='${id}';`;
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
            BP_BOOK_REPORT
        SET
            DEL_YN='Y'
        WHERE
            BP_BR_ID='${id}';`;
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
    
}
