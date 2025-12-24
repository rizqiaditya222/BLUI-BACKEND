const pool = require('../config/database');

class TransactionRepository {
  async findByUserId(userId, filters = {}) {
    let query = `
      SELECT t.*, c.name as category_name 
      FROM transactions t 
      LEFT JOIN categories c ON t.category_id = c.id 
      WHERE t.user_id = $1
    `;
    const params = [userId];
    let paramIndex = 2;

    if (filters.startDate) {
      query += ` AND t.date >= $${paramIndex}`;
      params.push(filters.startDate);
      paramIndex++;
    }

    if (filters.endDate) {
      query += ` AND t.date <= $${paramIndex}`;
      params.push(filters.endDate);
      paramIndex++;
    }

    if (filters.type) {
      query += ` AND t.type = $${paramIndex}`;
      params.push(filters.type);
      paramIndex++;
    }

    query += ' ORDER BY t.date DESC, t.created_at DESC';

    const result = await pool.query(query, params);
    return result.rows;
  }

  async create(transactionData) {
    const { userId, categoryId, amount, type, description, date } = transactionData;
    const result = await pool.query(
      'INSERT INTO transactions (user_id, category_id, amount, type, description, date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [userId, categoryId, amount, type, description, date]
    );
    return result.rows[0];
  }

  async findById(id, userId) {
    const result = await pool.query(
      'SELECT t.*, c.name as category_name FROM transactions t LEFT JOIN categories c ON t.category_id = c.id WHERE t.id = $1 AND t.user_id = $2',
      [id, userId]
    );
    return result.rows[0];
  }
}

module.exports = new TransactionRepository();
