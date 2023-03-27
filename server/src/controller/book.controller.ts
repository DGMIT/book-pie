import * as express from "express";
import { interfaces, controller, httpGet, httpPost, httpDelete, httpPut, request, queryParam, response, requestParam } from "inversify-express-utils";
import { inject } from "inversify";
import { Book } from "../models/book.model";
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
                res.sendStatus(404).json(data);
            }
        }catch(err) {
            res.status(500).json(err);
        }
    }
    
    // @httpGet("/:id")
    // private async getById(@requestParam("id") id: number, @response() res: express.Response) {
    //     try {
    //         const book: Book = await this.bookService.getById(id);
    //         if (!book) {
    //             res.sendStatus(404);
    //         } else {
    //             res.status(200).json(book);
    //         }
    //     } catch (err) {
    //         res.status(500).json({ err});
    //     }
    // }

    @httpPost("/")
    private async create(@request() req: express.Request, @response() res: express.Response) {
        try {
            const data = await this.bookService.create(req.body);
            if (data.result === 'OK') {
                res.status(201).json(data);
            } else {
                res.sendStatus(404).json(data);
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    @httpPut("/:id")
    private async update(@requestParam("id") id: string, @request() req: express.Request, @response() res: express.Response) {
        try {
            const data = await this.bookService.update(id, req.body);
            if (data.result === 'OK') {
                res.status(200).json(data);
            } else {
                res.sendStatus(404).json(data);
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    @httpPut("/delete/:id")
    private async delete(@requestParam("id") id: string, @response() res: express.Response) {
        try {
            const data = await this.bookService.delete(id);
            if (data.result === 'OK') {
                res.status(204).json(data);
            } else {
                res.sendStatus(404).json(data);
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}
