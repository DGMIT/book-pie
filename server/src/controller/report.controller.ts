import * as express from "express";
import { interfaces, controller, httpGet, httpPost, httpPut, request, response, requestParam } from "inversify-express-utils";
import { inject } from "inversify";
import {ReportService} from "../services/report.service";
import TYPES from "../constant/types";

@controller("/report")
export class ReportController implements interfaces.Controller {

    constructor( @inject(TYPES.ReportService) private reportService: ReportService) {}

    @httpGet("/:bookId")
    async getList(@requestParam("bookId") bookId: number, @response() res: express.Response) {
        try{
            const data = await this.reportService.getList(bookId);
            if (data.result === 'OK' || data.result === 'HAVE_NO_DATA') {
                res.status(200).json(data);
            } else {
                res.status(404).json(data);
            }
        }catch(err) {
            res.status(500).json(err);
        }
    }
    
    @httpGet("/get/:id")
    private async getById(@requestParam("id") id: number, @response() res: express.Response) {
        try {
            const data = await this.reportService.getById(id);
            if (data.result === 'OK') {
                res.status(200).json(data);
            } else {
                res.status(404).json(data);
            }
        } catch (err) {
            res.status(500).json({err});
        }
    }

    @httpPost("/:bookId")
    private async create(@requestParam("bookId") bookId: number, @request() req: express.Request, @response() res: express.Response) {
        try {
            const data = await this.reportService.create(bookId, req.body);
            if (data.result === 'OK') {
                res.status(201).json(data);
            } else {
                res.status(404).json(data);
            }
        } catch (err) {
            res.status(500).json({ err });
        }
    }

    @httpPut("/update/:id")
    private async update(@requestParam("id") id: number, @request() req: express.Request, @response() res: express.Response) {
        try {
            const data = await this.reportService.update(id, req.body);
            if (data.result === 'OK') {
                res.status(200).json(data);
            } else {
                res.status(404).json(data);
            }
        } catch (err) {
            res.status(500).json({ err });
        }
    }

    @httpPut("/delete/:id")
    private async delete(@requestParam("id") id: number, @response() res: express.Response) {
        try {
            const data = await this.reportService.delete(id);
            if (data.result === 'OK') {
                res.status(204).json(data);
            } else {
                res.status(404).json(data);
            }
        } catch (err) {
            res.status(500).json({err});
        }
    }
}
