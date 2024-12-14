const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
    {
        date: {
            type: Date,
            default: Date.now
        },
        description: {
            type: String,
            required: true
        },
        credit: {
            type: Number,
            default: 0
        },
        debit: {
            type: Number,
            default: 0
        },
        runningBalance: {
            type: Number,
            default: 0
        }
    }
)

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;