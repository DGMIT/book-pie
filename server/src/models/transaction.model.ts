export interface QueryInfo {
  queryStr: string;
  queryParams?: any[];
}

export interface TransactionResult {
  affectedRows: number;
  insertId: number;
  warningStatus: number;
  fieldCount?: number;
  info?: string;
  serverStatus?: number;
  changedRows?: number;
}
