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
            res.status(200).json(data);
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
            // const book: Book = await this.bookService.create(req.body);
            res.status(201).json();
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    /*

    @httpPut("/:id")
    private async update(@requestParam("id") id: string, @request() req: express.Request, @response() res: express.Response) {
        try {
            const updatedBook: Book = await this.bookService.update(id, req.body);
            if (!updatedBook) {
                res.sendStatus(404);
            } else {
                res.status(200).json(updatedBook);
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    @httpDelete("/:id")
    private async delete(@requestParam("id") id: string, @response() res: express.Response) {
        try {
            const deletedBook: Book = await this.bookService.delete(id);
            if (!deletedBook) {
                res.sendStatus(404);
            } else {
                res.sendStatus(204);
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
    */
}
