const transactionService = require('../services/transaction.service');

class TransactionController {
  async getTransactions(req, res, next) {
    try {
      const userId = req.user.id;
      const { startDate, endDate, type } = req.query;

      const filters = {};
      if (startDate) filters.startDate = startDate;
      if (endDate) filters.endDate = endDate;
      if (type) filters.type = type;

      const transactions = await transactionService.getTransactions(userId, filters);

      res.status(200).json({
        success: true,
        data: transactions,
      });
    } catch (error) {
      next(error);
    }
  }

  async createTransaction(req, res, next) {
    try {
      const userId = req.user.id;
      const { categoryId, amount, type, description, date } = req.body;

      if (!amount || !type) {
        return res.status(400).json({
          success: false,
          message: 'Amount and type are required',
        });
      }

      const transaction = await transactionService.createTransaction(userId, {
        categoryId,
        amount,
        type,
        description,
        date,
      });

      res.status(201).json({
        success: true,
        message: 'Transaction created successfully',
        data: transaction,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new TransactionController();
