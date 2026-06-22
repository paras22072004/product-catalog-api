import pool from "../config/db.js";

const categories = [
  "Electronics",
  "Fashion",
  "Books",
  "Home",
  "Sports",
];

async function seedProducts() {
  try {
    const batchSize = 5000;
    const totalProducts = 200000;

    for (let start = 0; start < totalProducts; start += batchSize) {
      const values = [];
      const placeholders = [];

      for (let i = 0; i < batchSize; i++) {
        const productNo = start + i + 1;

        const category =
          categories[Math.floor(Math.random() * categories.length)];

        const price = Math.floor(Math.random() * 10000) + 100;

        const createdAt = new Date(
          Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000)
        );

        const updatedAt = createdAt;

        const idx = i * 5;

        placeholders.push(
          `($${idx + 1},$${idx + 2},$${idx + 3},$${idx + 4},$${idx + 5})`
        );

        values.push(
          `Product ${productNo}`,
          category,
          price,
          createdAt,
          updatedAt
        );
      }

      await pool.query(
        `
        INSERT INTO products
        (name, category, price, created_at, updated_at)
        VALUES ${placeholders.join(",")}
      `,
        values
      );

      console.log(
        `Inserted ${Math.min(start + batchSize, totalProducts)} products`
      );
    }

    console.log("✅ 200000 products inserted");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedProducts();