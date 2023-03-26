export interface Book {
    bookId: number,
    title: string,
    author?: string,
    publisher?: string,
    startPageNum: number,
    endPageNum: number,
    startDate: string,
    endDate: string,
    weekendIncludeYN: 'Y' | 'N',
    writtenDatetime: string,
    updateDatetime: null | string
}

export interface Response {
    result: 'OK' | 'ERROR' | 'HAVE_NO_DATA'
}

export interface BookListResponse extends Response{
    result: 'OK',
    totalCount: number,
    bookList: Book[]
}