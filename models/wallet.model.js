import mongoose from "mongoose";
// Define wallet schema
const walletSchema = new mongoose.Schema({
    name: { type: String, required: true },
    balance: { type: Number, required: true, default: 0, min: 0 },
    date: { type: Date, required: true, default: Date.now },
  });

const Wallet = mongoose.connection.useDb("wallet").model('Wallet', walletSchema);
export default Wallet