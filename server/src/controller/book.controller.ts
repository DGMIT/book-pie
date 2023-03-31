import * as express from "express";
import { interfaces, controller, httpGet, httpPost, httpPut, request, response, requestParam } from "inversify-express-utils";
import { inject } from "inversify";
import {BookService} from "../services/book.service";
import TYPES from "../constant/types";

@controller("/book")
export class BookController implements interfaces.Controller {

    constructor( @inject(TYPES.BookService) private bookService: BookService ) {}

    @httpGet("/")
    async getList(@response() res: express.Response) {
        try{
            const data = await this.bookService.getList();
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
            const data = await this.bookService.getById(id);
            if (data.result === 'OK') {
                res.status(200).json(data);
            } else {
                res.status(404).json(data);
            }
        } catch (err) {
            res.status(500).json({err});
        }
    }

    @httpGet("/days/all")
    private async getConsecutiveDays(@response() res: express.Response) {
        try {
            const data = await this.bookService.getConsecutiveDays();
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
            const data = await this.bookService.create(req.body);
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
    private async update(@requestParam("id") id: number, @request() req: express.Request, @response() res: express.Response) {
        try {
            const data = await this.bookService.update(id, req.body);
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
            const data = await this.bookService.delete(id);
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
