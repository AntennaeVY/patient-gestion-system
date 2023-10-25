import { Router } from "express";
import { isAuthMiddleware } from "../../../../../middlewares/isAuth";
import { getAllDoctorShiftsGuard } from "../guards/getAllDoctorShifts.guard";
import { getAllDoctorShiftsController } from "../controllers/getAllDoctorShifts.controller";
import { getDoctorShiftGuard } from "../guards/getDoctorShift.guard";
import { getDoctorShiftController } from "../controllers/getDoctorShift.controller";
import { createDoctorShiftGuard } from "../guards/createDoctorShift.guard";
import { createDoctorShiftController } from "../controllers/createDoctorShift.controller";
import { updateDoctorShiftGuard } from "../guards/updateDoctorShift.guard";
import { updateDoctorShiftController } from "../controllers/updateDoctorShift.controller";
import { deleteDoctorShiftGuard } from "../guards/deleteDoctorShift.guard";
import { deleteDoctorShiftController } from "../controllers/deleteDoctorShift.controller";

const router = Router();

router.get(
  "/doctors/:doctor_id/shifts",
  isAuthMiddleware,
  getAllDoctorShiftsGuard,
  getAllDoctorShiftsController
);

router.get(
  "/doctors/:doctor_id/shifts/:id",
  isAuthMiddleware,
  getDoctorShiftGuard,
  getDoctorShiftController
);

router.post(
  "/doctors/:doctor_id/shifts",
  isAuthMiddleware,
  createDoctorShiftGuard,
  createDoctorShiftController
);

router.patch(
  "/doctors/:doctor_id/shifts/:id",
  isAuthMiddleware,
  updateDoctorShiftGuard,
  updateDoctorShiftController
);

router.delete(
  "/doctors/:doctor_id/shifts/:id",
  isAuthMiddleware,
  deleteDoctorShiftGuard,
  deleteDoctorShiftController
);

export default router;
