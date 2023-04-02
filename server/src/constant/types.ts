const TYPES = {
    mysqlPool: Symbol.for('mysqlPool'),
    BookRepository: Symbol.for('BookRepository'),
    BookService: Symbol.for('BookService'),
    ReportRepository: Symbol.for('ReportRepository'),
    ReportService: Symbol.for('ReportService'),
    DBexecute: Symbol.for('DBexecute'),
}

export default TYPES;