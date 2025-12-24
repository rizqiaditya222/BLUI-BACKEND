const categoryRepository = require('../repositories/category.repository');

class CategoryService {
  async getCategories(userId) {
    const categories = await categoryRepository.findByUserId(userId);
    return categories;
  }

  async createCategory(userId, categoryData) {
    const { name, type } = categoryData;

    if (!['income', 'expense'].includes(type)) {
      throw new Error('Type must be either income or expense');
    }

    const category = await categoryRepository.create({
      userId,
      name,
      type,
    });

    return category;
  }
}

module.exports = new CategoryService();
