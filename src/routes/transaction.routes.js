const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transaction.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/', authMiddleware, transactionController.getTransactions.bind(transactionController));
router.post('/', authMiddleware, transactionController.createTransaction.bind(transactionController));

module.exports = router;
