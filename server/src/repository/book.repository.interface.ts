import {
  RequestGetBook,
  RequestCreateBook,
  RequestUpdateBook,
  RequestDeleteBook
} from '../models/book.model';

interface BookRepositoryInterface {
  getBookList<T>(connection?: any): Promise<T[]>,
  getBook<T>(request: RequestGetBook, connection?: any): Promise<T>,
  createBook<T>(request: RequestCreateBook, connection?: any): Promise<T>,
  updateBook<T>(request: RequestUpdateBook, connection?: any): Promise<T>,
  deleteBook<T>(request: RequestDeleteBook, connection?: any): Promise<T>,
}

export default BookRepositoryInterface;