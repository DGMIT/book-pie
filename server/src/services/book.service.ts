import { injectable, inject } from "inversify";
import TYPES from "../constant/types";
import * as mysql from "mysql2/promise";

@injectable()
export class BookService {
    async getList(): Promise<any> {
        let result;
        // 데이터베이스 연결 설정
        const connection = await mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "localmysql1234",
            database: "BOOK_PIE",
        });

        // 데이터베이스 연결
        connection.connect();

        // 데이터베이스 쿼리 실행
        result = connection.query("SELECT * FROM BP_BOOK");

        // 데이터베이스 연결 종료
        connection.end();

        return result;
    }
}
