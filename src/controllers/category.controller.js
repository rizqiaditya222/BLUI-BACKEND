const categoryService = require('../services/category.service');

class CategoryController {
  async getCategories(req, res, next) {
    try {
      const userId = req.user.id;
      const categories = await categoryService.getCategories(userId);

      res.status(200).json({
        success: true,
        data: categories,
      });
    } catch (error) {
      next(error);
    }
  }

  async createCategory(req, res, next) {
    try {
      const userId = req.user.id;
      const { name, type } = req.body;

      if (!name || !type) {
        return res.status(400).json({
          success: false,
          message: 'Name and type are required',
        });
      }

      const category = await categoryService.createCategory(userId, { name, type });

      res.status(201).json({
        success: true,
        message: 'Category created successfully',
        data: category,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CategoryController();
