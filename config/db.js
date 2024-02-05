const { Pool } = require("pg");

// Create a PostgreSQL pool
const pool = new Pool({
  user: "airbyte",
  host: "airbyte.cqqg4q5hnscs.ap-south-1.rds.amazonaws.com",
  database: "learninganalytics",
  password: "F648d&lTHltriVidRa0R",
  port: 5432,
});

const connectDB = async () => {
  try {
    const client = await pool.connect();
    console.log("Database connection successful!");
    return client;
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error;
  }
};

const fetchData = async (userId) => {
  const client = await connectDB();
  const schemaName = "learninganalytics";
  const tableName = "statements_view_rank";

  try {
    console.log("try block");
    const sqlQuery = `SELECT * FROM ${schemaName}.${tableName} WHERE uid  = $1;`;
    const result = await client.query(sqlQuery, [userId]);
    console.log(result);
    return result.rows;
  } finally {
    client.release();
    console.log("Connection released.");
  }
};

module.exports = {
  fetchData,
};
