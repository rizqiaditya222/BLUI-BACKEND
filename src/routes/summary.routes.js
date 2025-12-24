const express = require('express');
const router = express.Router();
const summaryController = require('../controllers/summary.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/', authMiddleware, summaryController.getSummary.bind(summaryController));
router.get('/history', authMiddleware, summaryController.getSummaryHistory.bind(summaryController));

module.exports = router;
