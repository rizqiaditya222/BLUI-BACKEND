const summaryRepository = require('../repositories/summary.repository');

class SummaryService {
  async getSummary(userId) {
    const summary = await summaryRepository.getCurrentSummary(userId);
    return {
      total_income: parseFloat(summary.total_income),
      total_expense: parseFloat(summary.total_expense),
      balance: parseFloat(summary.balance),
    };
  }

  async getSummaryHistory(userId, months = 6) {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - months);

    const history = await summaryRepository.getMonthlySummary(
      userId,
      startDate.toISOString().split('T')[0],
      endDate.toISOString().split('T')[0]
    );

    return history.map(item => ({
      month: item.month,
      income: parseFloat(item.income),
      expense: parseFloat(item.expense),
      balance: parseFloat(item.balance),
    }));
  }
}

module.exports = new SummaryService();
