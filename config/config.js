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
module.exports = {
    user,
    host,
    database,
    password,
    port,
    schemaName,
    rank_table,
    average_table,
    jwt_secret_key
  };