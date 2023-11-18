import { Router } from "express";
import { isAuthMiddleware } from "../../../middlewares/isAuth";
import { getAccountController } from "../controllers/getAccount.controller";
import { getAccountGuard } from "../guards/getAccount.guard";

const router = Router();

router.get(
  "/accounts/:id",
  isAuthMiddleware,
  getAccountGuard,
  getAccountController
);

export default router;
