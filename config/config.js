require('dotenv').config();

const user = process.env.DB_USER;
const host = process.env.DB_HOST;
const database = process.env.DB_DATABASE;
const password = process.env.DB_PASSWORD;
const port = process.env.DB_PORT;
const schemaName = process.env.DB_SCHEMA;
const rank_table = process.env.DB_RANK_TABLE;
const average_table = process.env.DB_AVERAGE_TABLE;
const jwt_secret_key = process.env.JWT_SECRET;
const jwt_issuer = process.env.JWT_ISSUER;
const jwt_audience = process.env.JWT_AUDIENCE;
const statement_view_table = process.env.DB_STATEMENT_VIEW;
const statement_table = process.env.DB_STATEMENT_TABLE;
module.exports = {
  user,
  host,
  database,
  password,
  port,
  schemaName,
  rank_table,
  average_table,
  jwt_secret_key,
  jwt_issuer,
  jwt_audience,
  statement_view_table,
  statement_table,
};