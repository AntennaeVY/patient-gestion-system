import { IRouter } from "express";

import authRoutes from "../domains/auth/routes/auth.routes"
import patientRoutes from "../domains/patients/routes/patient.routes";
import servicesRoutes from "../domains/services/routes/services.routes";

const routes: IRouter[] = [authRoutes, patientRoutes, servicesRoutes];

export default routes;
