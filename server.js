const express = require("express");
const data = require("./data/data");
const db = require("./config/db");

const app = express();

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.get("/api/data", async (req, res) => {
  try {
    const userId = "1";

    const df = await db.fetchData(userId);

    console.log("Dataframe:", df);
    console.log("DataFrame updated.");
    res.json(df);
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
