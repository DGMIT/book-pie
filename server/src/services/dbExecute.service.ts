import { injectable, inject } from "inversify";
import TYPES from "../constant/types";
import * as mysql from "mysql2/promise";

@injectable()
export class DBexecute {
    async execute(queryStr: string) {
        try {
            // 데이터베이스 연결 설정
            const connection = await mysql.createConnection({
                host: "localhost",
                user: "root",
                password: "localmysql1234",
                database: "BOOK_PIE",
                timezone: "+00:00",
                charset: "utf8mb4",
            });

            // 데이터베이스 연결
            await connection.connect();

            // 데이터베이스 쿼리 실행
            let queryResult = await connection.query(queryStr);

            // 데이터베이스 연결 종료
            connection.end();

            return queryResult;
        } catch (err) {
            throw new Error(err.message);
        }
    }
}
