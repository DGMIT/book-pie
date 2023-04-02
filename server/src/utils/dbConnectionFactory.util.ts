import { injectable } from "inversify";
import * as mysql from "mysql2/promise";

@injectable()
class DBConnectionFactory {
  private static pool: mysql.Pool;
  private static instance: mysql.PoolConnection;

  public async getConnection(): Promise<mysql.PoolConnection> {
    const options: mysql.PoolOptions = {
      host: "localhost",
      // port: 4000, //왜 여길 써주면 에러나지?
      user: "root",
      password: "localmysql1234",
      database: "BOOK_PIE",
      waitForConnections: true,
      connectionLimit: 30,
      multipleStatements: true,
      connectTimeout: 3000,
      timezone: "+00:00",
      charset: "utf8mb4",
    };

    try {
      if (!DBConnectionFactory.pool) {
        DBConnectionFactory.pool = mysql.createPool(options);
      }

      if (!DBConnectionFactory.instance) {
        DBConnectionFactory.instance =
          await DBConnectionFactory.pool.getConnection();
      }

      if (!DBConnectionFactory.instance.ping()) {
        DBConnectionFactory.instance =
          await DBConnectionFactory.pool.getConnection();
      }
    } catch (error) {
      throw error;
    }

    return DBConnectionFactory.instance;
  }
}

export default DBConnectionFactory;
