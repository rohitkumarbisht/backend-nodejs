const { Pool } = require("pg");
const { user, host, database, password, port } = require("./config.js");
const { CustomInternalServerError } = require("../routes/error-handling/custom_error.js");

// Create a PostgreSQL pool
const pool = new Pool({
  user: user,
  host: host,
  database: database,
  password: password,
  port: port,
});

pool.on('error', (err) => {
  throw CustomInternalServerError(`${error}`)
});

module.exports = pool;
