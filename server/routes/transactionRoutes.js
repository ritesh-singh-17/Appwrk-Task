const express = require('express');
const { getTransactions, addTransaction, deleteAllTransactions } = require('../controllers/transactionController');
const router = express.Router();


router.get('/transactions', getTransactions)
router.post('/transactions', addTransaction)
router.delete('/transactions', deleteAllTransactions)

module.exports = router;