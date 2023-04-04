import { inject, injectable } from "inversify";
import TYPES from "../constant/types";
import {
  RequestGetReportList,
  RequestGetReport,
  RequestCreateReport,
  RequestUpdateReport,
  RequestDeleteReport,
} from "../models/report.model";
import { TransactionResult } from "../models/transaction.model";
import DBConnectionFactory from "../utils/dbConnectionFactory.util";
import ReportRepository from "../repository/report.repository";

@injectable()
class ReportService {
  constructor(
    @inject(TYPES.mysqlPool) private mysqlPool: DBConnectionFactory,
    @inject(TYPES.ReportRepository) private repository: ReportRepository
  ) {}

  public async getReportList<T>(request: RequestGetReportList): Promise<T[]> {
    let result: T[];
    let connection;

    try {
      connection = await this.mysqlPool.getConnection();
      connection.beginTransaction();

      result = await this.repository.getReportList(request, connection);
      connection && connection.commit();
    } catch (error) {
      connection && connection.rollback();
      throw error;
    } finally {
      connection && connection.release();
    }

    return result;
  }

  public async getReport<T>(request: RequestGetReport): Promise<T> {
    let result: T;
    let connection;

    try {
      connection = await this.mysqlPool.getConnection();
      connection.beginTransaction();

      result = await this.repository.getReport(request, connection);
      connection && connection.commit();
    } catch (error) {
      connection && connection.rollback();
      throw error;
    } finally {
      connection && connection.release();
    }

    return result;
  }

  public async createReport<T>(request: RequestCreateReport): Promise<T> {
    let result: T;
    let connection;

    try {
      connection = await this.mysqlPool.getConnection();
      connection.beginTransaction();

      const { insertId: newPostId } =
        await this.repository.createReport<TransactionResult>(
          request,
          connection
        );
      result = await this.repository.getReport(newPostId, connection);
      connection && connection.commit();
    } catch (error) {
      connection && connection.rollback();
      throw error;
    } finally {
      connection && connection.release();
    }

    return result;
  }

  public async updateReport<T>(request: RequestUpdateReport): Promise<T> {
    let result: T;
    let connection;

    try {
      connection = await this.mysqlPool.getConnection();
      connection.beginTransaction();

      await this.repository.updateReport(request, connection);
      result = await this.repository.getReport(request.reportId, connection);
      connection && connection.commit();
    } catch (error) {
      connection && connection.rollback();
      throw error;
    } finally {
      connection && connection.release();
    }

    return result;
  }

  public async deleteReport<T>(request: number): Promise<T> {
    let result: T;
    let connection;

    try {
      connection = await this.mysqlPool.getConnection();
      connection.beginTransaction();

      result = await this.repository.deleteReport(request, connection);
      connection && connection.commit();
    } catch (error) {
      connection && connection.rollback();
      throw error;
    } finally {
      connection && connection.release();
    }

    return result;
  }

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

export default ReportService;
