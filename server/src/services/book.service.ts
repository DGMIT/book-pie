import { inject, injectable } from "inversify";
import TYPES from "../constant/types";
import {
  RequestGetBook,
  RequestCreateBook,
  RequestUpdateBook,
  RequestDeleteBook,
} from "../models/book.model";
import { TransactionResult } from "../models/transaction.model";
import DBConnectionFactory from "../utils/dbConnectionFactory.util";
import BookRepository from "../repository/book.repository";

@injectable()
class BookService {
  constructor(
    @inject(TYPES.mysqlPool) private mysqlPool: DBConnectionFactory,
    @inject(TYPES.BookRepository) private repository: BookRepository 
  ){}

  public async getBookList<T>(): Promise<T[]> {
    let result: T[];
    let connection;
    
    try {
      connection = await this.mysqlPool.getConnection();
      connection.beginTransaction();

      result = await this.repository.getBookList(connection);
      connection && connection.commit();
    } catch (error) {
      connection && connection.rollback();
      throw error;
    } finally {
      connection && connection.release();
    }

    return result;
  }

  public async getBook<T>(request: RequestGetBook): Promise<T> {
    let result: T;
    let connection;

    try {
      connection = await this.mysqlPool.getConnection();
      connection.beginTransaction();

      result = await this.repository.getBook(request, connection);
      connection && connection.commit();
    } catch (error) {
      connection && connection.rollback();
      throw error;
    } finally {
      connection && connection.release();
    }

    return result;
  }

  public async createBook<T>(request: RequestCreateBook): Promise<T> {
    let result: T;
    let connection;

    try {
      connection = await this.mysqlPool.getConnection();
      connection.beginTransaction();

      const {insertId: newPostId} = await this.repository.createBook<TransactionResult>(request, connection);
      result = await this.repository.getBook(newPostId, connection);
      connection && connection.commit();
    } catch (error) {
      connection && connection.rollback();
      throw error;
    } finally {
      connection && connection.release();
    }

    return result;
  }
  
  public async updateBook<T>(request: RequestUpdateBook): Promise<T> {
    let result: T;
    let connection;

    try {
      connection = await this.mysqlPool.getConnection();
      connection.beginTransaction();

      await this.repository.updateBook(request, connection);
      result = await this.repository.getBook(request.bookId, connection);
      connection && connection.commit();
    } catch (error) {
      connection && connection.rollback();
      throw error;
    } finally {
      connection && connection.release();
    }

    return result;
  }

  public async deleteBook<T>(request: RequestDeleteBook): Promise<T> {
    let result: T;
    let connection;

    try {
      connection = await this.mysqlPool.getConnection();
      connection.beginTransaction();

      result = await this.repository.deleteBook(request, connection);
      connection && connection.commit();
    } catch (error) {
      connection && connection.rollback();
      throw error;
    } finally {
      connection && connection.release();
    }

    return result;
  }

  //연속 독서일수 API
  public async getConsecutiveDays<T>(): Promise<T[]> {
    let result: T[];
    let connection;

    try {
      connection = await this.mysqlPool.getConnection();
      connection.beginTransaction();

      result = await this.repository.getConsecutiveDays(connection);
      connection && connection.commit();
    } catch (error) {
      connection && connection.rollback();
      throw error;
    } finally {
      connection && connection.release();
    }

    return result;
  }
}

export default BookService;