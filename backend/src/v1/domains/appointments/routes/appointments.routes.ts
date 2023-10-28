import { Router } from "express";
import { isAuthMiddleware } from "../../../middlewares/isAuth";
import { getAllAppointmentsGuard } from "../guards/getAllAppointments.guard";
import { getAllAppointmentsController } from "../controllers/getAllAppointments.controller";
import { getAppointmentController } from "../controllers/getAppointment.controller";
import { createAppointmentGuard } from "../guards/createAppointment.guard";
import { createAppointmentController } from "../controllers/createAppointment.controller";
import { updateAppointmentGuard } from "../guards/updateAppointment.guard";
import { updateAppointmentController } from "../controllers/updateAppointment.controller";
import { deleteAppointmentController } from "../controllers/deleteAppointment.controller";
import { deleteAppointmentGuard } from "../guards/deleteAppointment.guard";
const router = Router();

router.get(
  "/appointments/",
  isAuthMiddleware,
  getAllAppointmentsGuard,
  getAllAppointmentsController
);

router.get(
  "/appointments/:id/",
  isAuthMiddleware,
  getAppointmentController
);

router.post(
  "/appointments/",
  isAuthMiddleware,
  createAppointmentGuard,
  createAppointmentController
);

router.patch(
  "/appointments/:id",
  isAuthMiddleware,
  updateAppointmentGuard,
  updateAppointmentController
);

router.delete(
  "/appointments/:id",
  isAuthMiddleware,
  deleteAppointmentGuard,
  deleteAppointmentController,
);

export default router;
