import { Router } from "express";

import { walletRouter } from "./wallet.route.js";
import { transactionRouter } from "./transaction.route.js";

const baseRouter = Router();

baseRouter.use("/wallet", walletRouter);
baseRouter.use("/transactions", transactionRouter);

export default baseRouter;
