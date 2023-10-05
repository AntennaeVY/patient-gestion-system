import { Router } from "express";

import { isAuthMiddleware } from "../../../middlewares/isAuth";
import { getPatientGuard } from "../guards/getPatient.guard";
import { getPatientController } from "../controllers/getPatient.controller";
import { getAllPatientsGuard } from "../guards/getAllPatients.guard";
import { getAllPatientsController } from "../controllers/getAllPatients.controller";
import { updateAccountGuard } from "../../account/guards/updateAccount.guard";
import { updatePatientGuard } from "../guards/updatePatient.guard";
import { updatePatientController } from "../controllers/updatePatient.controller";
import { deletePatientGuard } from "../guards/deletePatient.guard";
import { deletePatientController } from "../controllers/deletePatient.controller";

const router = Router();

router.get(
  "/patients/",
  isAuthMiddleware,
  getAllPatientsGuard,
  getAllPatientsController
);

router.get(
  "/patients/:id",
  isAuthMiddleware,
  getPatientGuard,
  getPatientController
);

router.patch(
  "/patients/:id",
  isAuthMiddleware,
  updateAccountGuard,
  updatePatientGuard,
  updatePatientController
)

router.delete(
  "/patients/:id",
  isAuthMiddleware,
  deletePatientGuard,
  deletePatientController
)

export default router;
