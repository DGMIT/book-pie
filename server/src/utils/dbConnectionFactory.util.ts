import { injectable } from "inversify";
import * as mysql from "mysql2/promise";
import * as dotenv from "dotenv";
import * as path from "path";
dotenv.config({ path: path.resolve(__dirname, "../../.env") });
@injectable()
class DBConnectionFactory {
  private static pool: mysql.Pool;
  private static instance: mysql.PoolConnection;

  public async getConnection(): Promise<mysql.PoolConnection> {
    const options: mysql.PoolOptions = {
      host: process.env.BP_DB_HOST,
      port: Number(process.env.BP_DB_PORT),
      user: process.env.BP_DB_USER,
      password: process.env.BP_DB_PASSWORD,
      database: process.env.BP_DB_NAME,
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
