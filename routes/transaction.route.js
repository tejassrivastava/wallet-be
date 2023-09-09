import { Router } from "express";
import transactionController from "../controllers/transaction.controller.js";
const router = Router();

router.get('/', transactionController.fetch);


export {router as transactionRouter} ;