import { Router } from "express";
import walletControler from "../controllers/wallet.controller.js";
const router = Router();

router.post("/setup", walletControler.setup);
router.post("/transact/:walletId", walletControler.transact);
router.get("/:id", walletControler.getWallet);

export { router as walletRouter };
