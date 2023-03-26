import {Container} from 'inversify';
import TYPES from '../constant/types';
import DBConnectionFactory from '../utils/dbConnectionFactory.util';
// import { IFooService, FooService } from '../services/fooService';

const container = new Container();

container.bind<DBConnectionFactory>(TYPES.mysqlPool).to(DBConnectionFactory);
// container.bind<IFooService>(TYPES.FooService).to(FooService);

export default container;