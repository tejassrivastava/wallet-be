import Transaction from "../models/transaction.model.js";

const transactionService = {}

transactionService.getTransactions = async ({walletId,skip,limit,page,sort}) => {
    // Find the transactions by wallet id
    
    const transactions = await Transaction.find({walletId})
    .sort({[sort]:-1})
    .skip((Number(page) -1) * limit || 0)
    .limit(Number(limit) * 1 || 10)
    
    const count = await Transaction.find({walletId}).count()
    
    
    
    return {transactions,count};
}

export default transactionService;