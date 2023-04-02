import {
  RequestGetReportList,
  RequestGetReport,
  RequestCreateReport,
  RequestUpdateReport,
  RequestDeleteReport
} from '../models/report.model';

interface ReportRepositoryInterface {
  getReportList<T>(request: RequestGetReportList, connection?: any): Promise<T[]>,
  getReport<T>(request: RequestGetReport, connection?: any): Promise<T>,
  createReport<T>(request: RequestCreateReport, connection?: any): Promise<T>,
  updateReport<T>(request: RequestUpdateReport, connection?: any): Promise<T>,
  deleteReport<T>(request: RequestDeleteReport, connection?: any): Promise<T>,
}

export default ReportRepositoryInterface;