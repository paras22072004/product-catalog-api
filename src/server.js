import dotenv from "dotenv";
import app from "./app.js";
import pool from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

try {
  const result = await pool.query("SELECT NOW()");
  console.log("✅ DB Connected");
  console.log(result.rows[0]);
} catch (err) {
  console.log("❌ DB Error:", err.message);
}

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});