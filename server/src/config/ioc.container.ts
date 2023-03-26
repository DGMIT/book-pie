import {Container} from 'inversify';
import TYPES from '../constant/types';
import {BookService} from '../services/book.service';
import { DBexecute } from '../services/dbExecute.service';

const container = new Container();

container.bind<BookService>(TYPES.BookService).to(BookService);
container.bind<DBexecute>(TYPES.DBexecute).to(DBexecute);

export default container;