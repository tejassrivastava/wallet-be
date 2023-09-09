import mongoose from "mongoose";
import transactionService from "../services/transaction.service.js";
import walletService from "../services/wallet.service.js";

const transactionController = {};

transactionController.fetch = async (req,res) => {
    try {
        // Validate request query
        const { walletId, skip, limit, page, sort } = req.query;
        if (!walletId || !mongoose.Types.ObjectId.isValid(walletId)) {
          return res.status(400).json({ message: 'Invalid wallet id' });
        }
        if (skip && (isNaN(skip) || skip < 0)) {
          return res.status(400).json({ message: 'Invalid skip value' });
        }
        if (limit && (isNaN(limit) || limit < 0)) {
          return res.status(400).json({ message: 'Invalid limit value' });
        }
    
        // Find the wallet by id
        const wallet = await walletService.findWalletById(walletId);
        if (!wallet) {
          return res.status(404).json({ message: 'Wallet not found' });
        }
    
        // Find the transactions by wallet id
        const {transactions,count} = await transactionService.getTransactions({walletId, skip, limit, page, sort})
    
        // Return the transactions array
        res.status(200).json({
         "transactions": transactions.map((transaction) => ({
            id: transaction._id,
            walletId: transaction.walletId,
            amount: transaction.amount,
            balance: transaction.balance,
            description: transaction.description,
            date: transaction.date,
            type: transaction.type,
          })),
        totalPages: Math.ceil(count / limit),
        currentPage: page
    });
      } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
}

export default transactionController;