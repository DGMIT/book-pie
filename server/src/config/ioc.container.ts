import {Container} from 'inversify';
import TYPES from '../constant/types';
import ReportService from '../services/report.service';
import DBConnectionFactory from '../utils/dbConnectionFactory.util';
import BookRepositoryInterface from '../repository/book.repository.interface';
import BookRepository from '../repository/book.repository';
import BookService from '../services/book.service';
import ReportRepositoryInterface from '../repository/report.repository.interface';
import ReportRepository from '../repository/report.repository';

const container = new Container();

container.bind<DBConnectionFactory>(TYPES.mysqlPool).to(DBConnectionFactory);
container.bind<BookRepositoryInterface>(TYPES.BookRepository).to(BookRepository);
container.bind<BookService>(TYPES.BookService).to(BookService);
container.bind<ReportRepositoryInterface>(TYPES.ReportRepository).to(ReportRepository);
container.bind<ReportService>(TYPES.ReportService).to(ReportService);

export default container;