import { Router } from "express";
import { isAuthMiddleware } from "../../../middlewares/isAuth";
import { getAccountController } from "../controllers/getAccount.controller";
import { getAccountGuard } from "../guards/getAccount.guard";
import { getMeController } from "../controllers/getMe.controller";

const router = Router();

router.get(
  "/accounts/me", 
  isAuthMiddleware, 
  getMeController
);

router.get(
  "/accounts/:id",
  isAuthMiddleware,
  getAccountGuard,
  getAccountController
);

export default router;
