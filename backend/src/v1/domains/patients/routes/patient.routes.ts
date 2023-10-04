import { Router } from "express";

import { isAuthMiddleware } from "../../../middlewares/isAuth";
import { getPatientGuard } from "../guards/getPatient.guard";
import { getPatientController } from "../controllers/getPatient.controller";
import { getAllPatientsGuard } from "../guards/getAllPatients.guard";
import { getAllPatientsController } from "../controllers/getAllPatients.controller";

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

export default router;
