import { Router } from "express";
import { isAuthMiddleware } from "../../../middlewares/isAuth";
import { getAllDoctorsGuard } from "../guards/getAllDoctors.guard";
import { getAllDoctorsController } from "../controllers/getAllDoctors.controller";
import { getDoctorGuard } from "../guards/getDoctor.guard";
import { getDoctorController } from "../controllers/getDoctor.controller";
import { updateAccountGuard } from "../../account/guards/updateAccount.guard";
import { updateDoctorGuard } from "../guards/updateDoctor.guard";
import { updateDoctorController } from "../controllers/updateDoctor.controller";
import { deleteDoctorGuard } from "../guards/deleteDoctor.guard";
import { deleteDoctorController } from "../controllers/deleteDoctor.controller";
import { createAccountGuard } from "../../auth/guards/createAccount.guard";
import { createDoctorGuard } from "../guards/createDoctor.guard";
import { createDoctorController } from "../controllers/createDoctor.controller";

const router = Router();

router.get(
  "/doctors/",
  isAuthMiddleware,
  getAllDoctorsGuard,
  getAllDoctorsController
);

router.get(
  "/doctors/:id",
  isAuthMiddleware,
  getDoctorGuard,
  getDoctorController
);

router.post(
  "/doctors",
  isAuthMiddleware,
  createAccountGuard,
  createDoctorGuard,
  createDoctorController
);

router.patch(
  "/doctors/:id",
  isAuthMiddleware,
  updateAccountGuard,
  updateDoctorGuard,
  updateDoctorController
);

router.delete(
  "/doctors/:id",
  isAuthMiddleware,
  deleteDoctorGuard,
  deleteDoctorController
);

export default router;
