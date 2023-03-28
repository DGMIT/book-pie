export interface Report {
    bookReportId: number,
    lastReadPageNum: number,
    contentText: string,
    writtenDatetime: string,
    updateDatetime: null | string,
    bookId: number
}

export interface Response {
    result: 'OK' | 'ERROR' | 'HAVE_NO_DATA'
}

export interface ReportListResponse extends Response{
    result: 'OK',
    totalCount: number,
    reportList: Report[]
}

export interface ReportResponse extends Response{
    result: 'OK',
    reportData: Report;
}

export interface ReportCreateRequest {
    lastReadPageNum: number,
    contentText: string,
    bookId: number
}