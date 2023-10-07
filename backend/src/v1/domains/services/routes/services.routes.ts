import { Router } from "express";
import { isAuthMiddleware } from "../../../middlewares/isAuth";
import { getAllServicesGuard } from "../guards/getAllServices.guard";
import { getAllServicesController } from "../controllers/getAllServices.controller";
import { getServiceController } from "../controllers/getService.controller";
import { createServiceGuard } from "../guards/createService.guard";
import { createServiceController } from "../controllers/createService.controller";
import { updateServiceGuard } from "../guards/updateService.guard";
import { updateServiceController } from "../controllers/updateService.controller";
import { deleteServiceGuard } from "../guards/deleteService.guard";
import { deleteServiceController } from "../controllers/deleteService.controller";

const router = Router();

router.get(
  "/services/",
  isAuthMiddleware,
  getAllServicesGuard,
  getAllServicesController
);

router.get("/services/:id", isAuthMiddleware, getServiceController);

router.post(
  "/services/",
  isAuthMiddleware,
  createServiceGuard,
  createServiceController
);

router.patch(
  "/services/:id",
  isAuthMiddleware,
  updateServiceGuard,
  updateServiceController
);

router.delete(
	"/services/:id",
	isAuthMiddleware,
	deleteServiceGuard,
	deleteServiceController
);

export default router;
