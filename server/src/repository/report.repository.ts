//쿼리를 실제로 실행한 결과를 반환해주는 파일
import { inject } from "inversify";
import BaseMysqlRepository from "./baseMysql.repository";
import ReportRepositoryInterface from "./report.repository.interface";
import TYPES from "../constant/types";
import DBConnectionFactory from "../utils/dbConnectionFactory.util";
import { ReportQuery, ReportQueryId } from "../query/report.query";
import { QueryInfo } from "../models/transaction.model";
import { RequestCreateReport, RequestGetReport, RequestGetReportList, RequestUpdateReport } from "../models/report.model";

class ReportRepository
  extends BaseMysqlRepository
  implements ReportRepositoryInterface
{
  constructor(
    @inject(TYPES.mysqlPool) protected mysqlPool: DBConnectionFactory
  ) {
    super(mysqlPool);
  }

  //쿼리 만들기
  //그 만든걸 실행한 결과 리턴
  public async getReportList<T>(request: RequestGetReportList,connection?: any): Promise<T[]> {
    const queryInfo: QueryInfo = ReportQuery(ReportQueryId.getReportList, request);
    return await this.query(queryInfo.queryStr, queryInfo.queryParams, connection);
  }

  public async getReport<T>(request: RequestGetReport, connection?: any): Promise<T> {
    const queryInfo: QueryInfo = ReportQuery(ReportQueryId.getReport, request);
    const rows = await this.query(queryInfo.queryStr, queryInfo.queryParams, connection);

    let result: T;
    if(rows && rows.length > 0) {
      result = rows[0] as T;
    }

    return result;
  }

  public async createReport<T>(request: RequestCreateReport, connection?: any): Promise<T> {
    const queryInfo: QueryInfo = ReportQuery(ReportQueryId.createReport, request);
    return await this.execute(queryInfo.queryStr, queryInfo.queryParams, connection);
  }
  
  public async updateReport<T>(request: RequestUpdateReport, connection?: any): Promise<T> {
    const queryInfo: QueryInfo = ReportQuery(ReportQueryId.updateReport, request);
    return await this.execute(queryInfo.queryStr, queryInfo.queryParams, connection);
  }
  
  public async deleteReport<T>(request: number, connection?: any): Promise<T> {
    const queryInfo: QueryInfo = ReportQuery(ReportQueryId.deleteReport, request);
    return await this.execute(queryInfo.queryStr, queryInfo.queryParams, connection);
  }
}


export default ReportRepository;