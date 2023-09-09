import mongoose from "mongoose";
import walletService from "../services/wallet.service.js";

const walletControler = {};

walletControler.setup = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(500).json({ error: "Empty Request" });
    }
    // Validate request body
    const { name, balance } = req.body;

    if (!name || typeof name !== "string") {
      return res.status(400).json({ message: "Invalid name" });
    }
    if (balance && typeof balance !== "number") {
      return res.status(400).json({ message: "Invalid balance" });
    }

    // Create a new wallet
    const wallet = await walletService.createWallet({ name, balance });

    // Create a transaction for the initial balance
    const transaction = await walletService.createTransaction({
      walletId: wallet._id,
      amount: wallet.balance,
      balance: wallet.balance,
      description: "Initial balance",
      type: "CREDIT",
    });

    // Return the wallet and transaction details
    res.status(200).json({
      id: wallet._id,
      balance: wallet.balance,
      transactionId: transaction._id,
      name: wallet.name,
      date: wallet.date,
    });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

walletControler.transact = async (req, res) => {
  try {
    // Validate request params and body
    const { walletId } = req.params;
    const { amount, description } = req.body;
    if (!walletId || !mongoose.Types.ObjectId.isValid(walletId)) {
      return res.status(400).json({ message: "Invalid wallet id" });
    }
    if (!amount || typeof amount !== "number") {
      return res.status(400).json({ message: "Invalid amount" });
    }
    if (!description || typeof description !== "string") {
      return res.status(400).json({ message: "Invalid description" });
    }

    // Find the wallet by id
    const wallet = await walletService.findWalletById(walletId);
    if (!wallet) {
      return res.status(404).json({ message: "Wallet not found" });
    }

    // Check if the amount is valid for debit transactions
    if (amount < 0 && Math.abs(amount) > wallet.balance) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    // Update the wallet balance using atomic operation
    const updatedWallet = await walletService.updateWalletBalance({
      walletId,
      amount,
    });

    // Create a new transaction
    const transaction = await walletService.createTransaction({
      walletId,
      amount,
      balance: updatedWallet.balance,
      description,
      type: amount > 0 ? "CREDIT" : "DEBIT",
    });
    // Return the updated balance and transaction id
    res.status(200).json({
      balance: updatedWallet.balance,
      transactionId: transaction._id,
    });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

walletControler.getWallet = async (req, res) => {
  try {
    // Validate request params
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid wallet id" });
    }

    // Find the wallet by id
    const wallet = await walletService.findWalletById(id);
    if (!wallet) {
      return res.status(404).json({ message: "Wallet not found" });
    }

    // Return the wallet details
    res.status(200).json({
      id: wallet._id,
      balance: wallet.balance,
      name: wallet.name,
      date: wallet.date,
    });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export default walletControler;
