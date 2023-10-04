import { Router } from "express";
import { isAuthMiddleware } from "../../../middlewares/isAuth";
import { getAccountController } from "../controllers/getAccount.controller";
import { isAdminMiddleware } from "../../../middlewares/isAdmin";

const router = Router();

router.get(
  "/accounts/:id",
  isAuthMiddleware,
  isAdminMiddleware,
  getAccountController
);

export default router;
