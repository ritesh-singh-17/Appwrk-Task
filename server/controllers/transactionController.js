const Transaction = require('../models/transactionModel');

// Get all transactions
exports.getTransactions = async (req,res) => {
    try{
        const transactions = await Transaction.find().sort({date: -1});
        res.status(200).json(transactions)
    }catch(error){
        res.status(500).json({message: "Error in getting transactions", error: error})
    }
}

exports.addTransaction = async (req, res) => {
    try {
        const {description, type, amount} = req.body;
        const lastTransaction = await Transaction.find().sort({date: -1})
        if(type==='debit' && lastTransaction[0].runningBalance < amount){
            return res.status(400).json({message: "Insufficient balance for debit transaction"})
        }
        const newTransaction = new Transaction({
            date: Date.now(),
            description: description,
            credit: type==='credit' ? amount : 0,
            debit: type==='debit' ? amount : 0,
            runningBalance: lastTransaction.length===0 ? 
            (type==='credit'? 0 + amount : 0 -amount) :
            (type==='credit'? (parseInt(lastTransaction[0].runningBalance) + parseInt(amount)) : (parseInt(lastTransaction[0].runningBalance) - parseInt(amount)))
        });
        await newTransaction.save();
        res.status(201).json(newTransaction)
    }catch(error){
        console.log(error)
        res.status(500).json({message: "Error in adding transaction", error: error})
    }
}

exports.deleteAllTransactions = async (req,res) => {
    try{
        const respone = await Transaction.deleteMany();
        res.status(200).json({message: "All transactions deleted"})
    }catch(error){
        res.status(500).json({message: "Error in deleting transactions", error: error})
    }
}