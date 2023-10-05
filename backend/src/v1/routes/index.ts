import { IRouter } from "express";

import authRoutes from "../domains/auth/routes/auth.routes"
import patientRoutes from "../domains/patients/routes/patient.routes";

const routes: IRouter[] = [authRoutes, patientRoutes];

export default routes;
