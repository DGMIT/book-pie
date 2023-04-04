import * as express from "express";
import {
  interfaces,
  controller,
  httpGet,
  httpPost,
  httpPut,
  request,
  response,
  httpDelete,
} from "inversify-express-utils";
import { inject } from "inversify";
import TYPES from "../constant/types";
import ReportService from "../services/report.service";
import {
  RequestCreateReport,
  RequestUpdateReport,
} from "../models/report.model";
import { RequestDeleteReport } from "../models/report.model";

@controller("/report")
export class ReportController implements interfaces.Controller {
  constructor(
    @inject(TYPES.ReportService) private reportService: ReportService
  ) {}

  @httpGet("/:bookId")
  async getReportList(
    @request() req: express.Request,
    @response() res: express.Response
  ) {
    const bookId = Number(req.params.bookId);
    return await this.reportService.getReportList(bookId);
  }

  @httpPost("/")
  private async createReport(
    @request() req: express.Request,
    @response() res: express.Response
  ) {
    const newPost: RequestCreateReport = {
      lastReadPageNum: Number(req.body.lastReadPageNum),
      contentText: req.body.contentText,
      bookId: Number(req.body.bookId),
    };

    return await this.reportService.createReport(newPost);
  }

  @httpPut("/:reportId") //@@업데이트와 삭제 엔드 포인트 어떻게 구현하는지 확인 필요
  private async updateReport(
    @request() req: express.Request,
    @response() res: express.Response
  ) {
    const updatePost: RequestUpdateReport = {
      reportId: Number(req.params.reportId),
      lastReadPageNum: Number(req.body.lastReadPageNum),
      contentText: req.body.contentText,
    };

    return await this.reportService.updateReport(updatePost);
  }

  @httpDelete("/:reportId")
  private async deleteReport(
    @request() req: express.Request,
    @response() res: express.Response
  ) {
    const reportId: RequestDeleteReport = Number(req.params.reportId);

    return await this.reportService.deleteReport(reportId);
  }

  @httpGet("/days/all")
  private async getConsecutiveDays(@response() res: express.Response) {
    return await this.reportService.getConsecutiveDays();
  }
}

export default ReportController;
