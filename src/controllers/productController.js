import pool from "../config/db.js";

export const getProducts = async (req, res) => {
  try {
    const { category, cursorCreatedAt, cursorId, limit = 20 } = req.query;

    let query = `
      SELECT *
      FROM products
      WHERE 1=1
    `;

    const values = [];
    let index = 1;

    if (category) {
      query += ` AND category = $${index}`;
      values.push(category);
      index++;
    }

    if (cursorCreatedAt && cursorId) {
      query += `
        AND (
          created_at < $${index}
          OR (
            created_at = $${index}
            AND id < $${index + 1}
          )
        )
      `;

      values.push(cursorCreatedAt);
      values.push(cursorId);

      index += 2;
    }

    query += `
      ORDER BY created_at DESC, id DESC
      LIMIT $${index}
    `;

    values.push(Number(limit));

    const result = await pool.query(query, values);

    const products = result.rows;

    let nextCursor = null;

    if (products.length > 0) {
      const last = products[products.length - 1];

      nextCursor = {
        cursorCreatedAt: last.created_at,
        cursorId: last.id,
      };
    }

    res.json({
      count: products.length,
      nextCursor,
      products,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};