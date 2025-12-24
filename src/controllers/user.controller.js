const userService = require('../services/user.service');

class UserController {
  async getProfile(req, res, next) {
    try {
      const userId = req.user.id;
      const user = await userService.getProfile(userId);

      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateProfile(req, res, next) {
    try {
      const userId = req.user.id;
      const { name, email } = req.body;

      if (!name && !email) {
        return res.status(400).json({
          success: false,
          message: 'At least one field (name or email) is required',
        });
      }

      const user = await userService.updateProfile(userId, { name, email });

      res.status(200).json({
        success: true,
        message: 'Profile updated successfully',
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
