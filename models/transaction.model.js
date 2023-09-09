import mongoose from "mongoose";

// Define transaction schema
const transactionSchema = new mongoose.Schema({
    walletId: { type: mongoose.Schema.Types.ObjectId, ref: 'Wallet' },
    amount: { type: Number, required: true },
    balance: { type: Number, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true, default: Date.now },
    type: { type: String, enum: ['CREDIT', 'DEBIT'], required: true },
  });
  
const Transaction = mongoose.connection.useDb("wallet").model('Transaction', transactionSchema);

  
export default Transaction