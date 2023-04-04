//쿼리를 실제로 실행한 결과를 반환해주는 파일
import { inject } from "inversify";
import BaseMysqlRepository from "./baseMysql.repository";
import BookRepositoryInterface from "./book.repository.interface";
import TYPES from "../constant/types";
import DBConnectionFactory from "../utils/dbConnectionFactory.util";
import { BookQuery, BookQueryId } from "../query/book.query";
import { QueryInfo } from "../models/transaction.model";
import { RequestCreateBook, RequestGetBook, RequestUpdateBook } from "../models/book.model";

class BookRepository
  extends BaseMysqlRepository
  implements BookRepositoryInterface
{
  constructor(
    @inject(TYPES.mysqlPool) protected mysqlPool: DBConnectionFactory
  ) {
    super(mysqlPool);
  }

  public async getBookList<T>(connection?: any): Promise<T[]> {
    const queryInfo: QueryInfo = BookQuery(BookQueryId.getBookList);
    return await this.query(queryInfo.queryStr, queryInfo.queryParams, connection);
  }

  public async getBook<T>(request: RequestGetBook, connection?: any): Promise<T> {
    const queryInfo: QueryInfo = BookQuery(BookQueryId.getBook, request);
    const rows = await this.query(queryInfo.queryStr, queryInfo.queryParams, connection);

    let result: T;
    if(rows && rows.length > 0) {
      result = rows[0] as T;
    }

    return result;
  }

  public async createBook<T>(request: RequestCreateBook, connection?: any): Promise<T> {
    const queryInfo: QueryInfo = BookQuery(BookQueryId.createBook, request);
    return await this.execute(queryInfo.queryStr, queryInfo.queryParams, connection);
  }
  
  public async updateBook<T>(request: RequestUpdateBook, connection?: any): Promise<T> {
    const queryInfo: QueryInfo = BookQuery(BookQueryId.updateBook, request);
    return await this.execute(queryInfo.queryStr, queryInfo.queryParams, connection);
  }
  
  public async deleteBook<T>(request: number, connection?: any): Promise<T> {
    const queryInfo: QueryInfo = BookQuery(BookQueryId.deleteBook, request);
    return await this.execute(queryInfo.queryStr, queryInfo.queryParams, connection);
  }
}


export default BookRepository;