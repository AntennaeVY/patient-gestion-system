import { Router } from "express";
import { isAuthMiddleware } from "../../../middlewares/isAuth";
import { getAllRecepcionistsGuard } from "../guards/getAllRecepcionists.guard";
import { getAllRecepcionistsController } from "../controllers/getAllRecepcionists.controller";
import { getRecepcionistGuard } from "../guards/getRecepcionist.guard";
import { getRecepcionistController } from "../controllers/getRecepcionist.controller";
import { createRecepcionistGuard } from "../guards/createRecepcionist.guard";
import { createAccountGuard } from "../../auth/guards/createAccount.guard";
import { createRecepcionistController } from "../controllers/createRecepcionist.controller";
import { updateAccountGuard } from "../../account/guards/updateAccount.guard";
import { updateRecepcionistGuard } from "../guards/updateRecepcionist.guard";
import { updateRecepcionistController } from "../controllers/updateRecepcionist.controller";
import { deleteRecepcionistGuard } from "../guards/deleteRecepcionist.guard";
import { deleteRecepcionistController } from "../controllers/deleteRecepcionist.controller";

const router = Router();

router.get(
  "/recepcionists/",
  isAuthMiddleware,
  getAllRecepcionistsGuard,
  getAllRecepcionistsController
);

router.get(
  "/recepcionists/:id",
  isAuthMiddleware,
  getRecepcionistGuard,
  getRecepcionistController
);

router.post(
  "/recepcionists",
  isAuthMiddleware,
  createAccountGuard,
  createRecepcionistGuard,
  createRecepcionistController
);

router.patch(
  "/recepcionists/:id",
  isAuthMiddleware,
  updateAccountGuard,
  updateRecepcionistGuard,
  updateRecepcionistController
);

router.delete(
  "/recepcionists/:id",
  isAuthMiddleware,
  deleteRecepcionistGuard,
  deleteRecepcionistController
);

export default router;
