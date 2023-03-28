import {Container} from 'inversify';
import TYPES from '../constant/types';
import {BookService} from '../services/book.service';
import { DBexecute } from '../services/dbExecute.service';
import { ReportService } from '../services/report.service';

const container = new Container();

container.bind<DBexecute>(TYPES.DBexecute).to(DBexecute);
container.bind<BookService>(TYPES.BookService).to(BookService);
container.bind<ReportService>(TYPES.ReportService).to(ReportService);

export default container;