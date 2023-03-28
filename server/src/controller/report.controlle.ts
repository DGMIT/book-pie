import * as express from "express";
import { interfaces, controller, httpGet, httpPost, httpPut, request, response, requestParam } from "inversify-express-utils";
import { inject } from "inversify";
import {ReportService} from "../services/report.service";
import TYPES from "../constant/types";

@controller("/report")
export class BookController implements interfaces.Controller {

    constructor( @inject(TYPES.ReportService) private reportService: ReportService ) {}

    @httpGet("/")
    async getList(@response() res: express.Response) {
        try{
            const data = await this.reportService.getList();
            if (data.result === 'OK' || data.result === 'HAVE_NO_DATA') {
                res.status(200).json(data);
            } else {
                res.status(404).json(data);
            }
        }catch(err) {
            res.status(500).json(err);
        }
    }
    
    @httpGet("/:id")
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

    @httpPost("/")
    private async create(@request() req: express.Request, @response() res: express.Response) {
        try {
            const data = await this.reportService.create(req.body);
            if (data.result === 'OK') {
                res.status(201).json(data);
            } else {
                res.status(404).json(data);
            }
        } catch (err) {
            res.status(500).json({ err });
        }
    }

    @httpPut("/:id")
    private async update(@requestParam("id") id: string, @request() req: express.Request, @response() res: express.Response) {
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
    private async delete(@requestParam("id") id: string, @response() res: express.Response) {
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
