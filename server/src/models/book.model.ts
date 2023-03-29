export interface Book {
    bookId: number,
    title: string,
    author?: string,
    publisher?: string,
    startPageNum: number,
    endPageNum: number,
    startDate: string,
    endDate: string,
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

export interface BookResponse extends Response{
    result: 'OK',
    bookData: Book;
}

export interface BookCreateRequest {
    title: string,
    author?: string,
    publisher?: string,
    startPageNum: number,
    endPageNum: number,
    startDate: string,
    endDate: string,
}
export interface BookUpdateRequest extends BookCreateRequest {}