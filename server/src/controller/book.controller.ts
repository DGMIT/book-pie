import * as express from "express";
import {
  interfaces,
  controller,
  httpGet,
  httpPost,
  httpPut,
  request,
  response,
} from "inversify-express-utils";
import { inject } from "inversify";
import TYPES from "../constant/types";
import BookService from "../services/book.service";
import { RequestCreateBook, RequestUpdateBook } from "../models/book.model";
import { RequestDeleteBook } from "../models/book.model";

@controller("/book")
export class BookController implements interfaces.Controller {
  constructor(@inject(TYPES.BookService) private bookService: BookService) {}

  @httpGet("/")
  async getBookList(@response() res: express.Response) {
    return await this.bookService.getBookList();
  }

  @httpGet("/:bookId")
  private async getBook(
    @request() req: express.Request,
    @response() res: express.Response
  ) {
    const bookId = Number(req.params.bookId);
    return await this.bookService.getBook(bookId);
  }

  @httpPost("/")
  private async createBook(
    @request() req: express.Request,
    @response() res: express.Response
  ) {
    const newPost: RequestCreateBook = {
      title: req.body.title,
      author: req.body.author,
      publisher: req.body.publisher,
      startPageNum: Number(req.body.startPageNum),
      endPageNum: Number(req.body.endPageNum),
      startDate: req.body.startDate,
      endDate: req.body.endDate,
    };

    return await this.bookService.createBook(newPost);
  }

  @httpPut("/update/:bookId") //@@업데이트와 삭제 엔드 포인트 어떻게 구현하는지 확인 필요
  private async updateBook(
    @request() req: express.Request,
    @response() res: express.Response
  ) {
    const updatePost: RequestUpdateBook = {
      bookId: Number(req.params.bookId),
      title: req.body.title,
      author: req.body.author,
      publisher: req.body.publisher,
      startPageNum: Number(req.body.startPageNum),
      endPageNum: Number(req.body.endPageNum),
      startDate: req.body.startDate,
      endDate: req.body.endDate,
    };
    return await this.bookService.updateBook(updatePost);
  }

  @httpPut("/delete/:bookId")
  private async delete(
    @request() req: express.Request,
    @response() res: express.Response
  ) {
    const bookId: RequestDeleteBook = Number(req.params.bookId);

    return await this.bookService.deleteBook(bookId);
  }

  //연속 독서 일수 API
  @httpGet("/days/all")
  private async getConsecutiveDays(@response() res: express.Response) {
    return await this.bookService.getConsecutiveDays();
  }
}

export default BookController;
