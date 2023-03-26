import {Container} from 'inversify';
import TYPES from '../constant/types';
import {BookService} from '../services/book.service';

const container = new Container();

container.bind<BookService>(TYPES.BookService).to(BookService);

export default container;