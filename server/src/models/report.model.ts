export interface Report {
    reportId: number,
    lastReadPageNum: number,
    contentText: string,
    writtenDatetime: string,
    updateDatetime: null | string,
    bookId: number
}

//request
export type RequestGetReportList = number;

export type RequestGetReport = number;

export interface RequestCreateReport {
    lastReadPageNum: number,
    contentText: string,
    bookId: number
}
export interface RequestUpdateReport {
    reportId: number,
    lastReadPageNum: number,
    contentText: string,
}

export type RequestDeleteReport = number;
