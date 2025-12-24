const pool = require('../config/database');

class SummaryRepository {
  async getCurrentSummary(userId) {
    const result = await pool.query(
      `SELECT 
        COALESCE(SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END), 0) as total_income,
        COALESCE(SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END), 0) as total_expense,
        COALESCE(SUM(CASE WHEN type = 'income' THEN amount ELSE -amount END), 0) as balance
      FROM transactions 
      WHERE user_id = $1`,
      [userId]
    );
    return result.rows[0];
  }

  async getMonthlySummary(userId, startDate, endDate) {
    const result = await pool.query(
      `SELECT 
        TO_CHAR(date, 'YYYY-MM') as month,
        COALESCE(SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END), 0) as income,
        COALESCE(SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END), 0) as expense,
        COALESCE(SUM(CASE WHEN type = 'income' THEN amount ELSE -amount END), 0) as balance
      FROM transactions 
      WHERE user_id = $1 AND date BETWEEN $2 AND $3
      GROUP BY TO_CHAR(date, 'YYYY-MM')
      ORDER BY month DESC`,
      [userId, startDate, endDate]
    );
    return result.rows;
  }
}

module.exports = new SummaryRepository();
