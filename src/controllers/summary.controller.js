const summaryService = require('../services/summary.service');

class SummaryController {
  async getSummary(req, res, next) {
    try {
      const userId = req.user.id;
      const summary = await summaryService.getSummary(userId);

      res.status(200).json({
        success: true,
        data: summary,
      });
    } catch (error) {
      next(error);
    }
  }

  async getSummaryHistory(req, res, next) {
    try {
      const userId = req.user.id;
      const months = parseInt(req.query.months) || 6;

      const history = await summaryService.getSummaryHistory(userId, months);

      res.status(200).json({
        success: true,
        data: history,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new SummaryController();
