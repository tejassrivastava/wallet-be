import Transaction from "../models/transaction.model.js";
import Wallet from "../models/wallet.model.js";

const walletService = {};

walletService.createWallet = async ({ name, balance }) => {
  // Create a new wallet
  const wallet = new Wallet({ name, balance });
  return await wallet.save();
};

walletService.createTransaction = async ({
  walletId,
  amount,
  balance,
  description,
  type,
}) => {
  // Create a transaction for the initial balance
  const transaction = new Transaction({
    walletId,
    amount,
    balance,
    description,
    type,
  });
  return await transaction.save();
};

walletService.findWalletById = async (walletId) => {
  const wallet = await Wallet.findById(walletId);
  return wallet;
};

walletService.updateWalletBalance = async ({ walletId, amount }) => {
  const updatedWallet = await Wallet.findByIdAndUpdate(
    walletId,
    { $inc: { balance: amount } },
    { new: true }
  );
  return updatedWallet;
};

export default walletService;
