export interface Book {
    bookId: number,
    title: string,
    author: string,
    publisher: string,
    startPageNum: number,
    endPageNum: number,
    startDate: string,
    endDate: string,
    writtenDatetime: string,
    updateDatetime: null | string,
    maxLastReadNum: number
}

//request
export type RequestGetBook = number;

export interface RequestCreateBook {
    title: string,
    author: string,
    publisher: string,
    startPageNum: number,
    endPageNum: number,
    startDate: string,
    endDate: string,
}
export interface RequestUpdateBook extends RequestCreateBook {
    bookId: number
}

export type RequestDeleteBook = number;
