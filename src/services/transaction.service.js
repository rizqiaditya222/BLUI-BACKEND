const transactionRepository = require('../repositories/transaction.repository');
const categoryRepository = require('../repositories/category.repository');

class TransactionService {
  async getTransactions(userId, filters) {
    const transactions = await transactionRepository.findByUserId(userId, filters);
    return transactions;
  }

  async createTransaction(userId, transactionData) {
    const { categoryId, amount, type, description, date } = transactionData;

    if (!['income', 'expense'].includes(type)) {
      throw new Error('Type must be either income or expense');
    }

    if (categoryId) {
      const category = await categoryRepository.findById(categoryId, userId);
      if (!category) {
        throw new Error('Category not found');
      }
    }

    const transaction = await transactionRepository.create({
      userId,
      categoryId: categoryId || null,
      amount,
      type,
      description: description || null,
      date: date || new Date(),
    });

    return transaction;
  }
}

module.exports = new TransactionService();
