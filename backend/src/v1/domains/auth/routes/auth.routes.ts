import { Router } from "express";

import { createAccountGuard } from "../guards/createAccount.guard";
import { registerPatientGuard } from "../guards/registerPatient.guard";
import { registerController } from "../controllers/registerAccount.controller";
import { loginAccountGuard } from "../guards/loginAccount.guard";
import { loginAccountController } from "../controllers/loginAccount.controller";

const router = Router();

router.post("/auth/login", loginAccountGuard, loginAccountController);
router.post("/auth/register", createAccountGuard, registerPatientGuard, registerController);

export default router;
