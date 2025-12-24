const pool = require('../config/database');

class CategoryRepository {
  async findByUserId(userId) {
    const result = await pool.query(
      'SELECT * FROM categories WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );
    return result.rows;
  }

  async create(categoryData) {
    const { userId, name, type } = categoryData;
    const result = await pool.query(
      'INSERT INTO categories (user_id, name, type) VALUES ($1, $2, $3) RETURNING *',
      [userId, name, type]
    );
    return result.rows[0];
  }

  async findById(id, userId) {
    const result = await pool.query(
      'SELECT * FROM categories WHERE id = $1 AND user_id = $2',
      [id, userId]
    );
    return result.rows[0];
  }
}

module.exports = new CategoryRepository();
