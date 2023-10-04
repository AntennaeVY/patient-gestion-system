import { IRouter } from "express";

import authRoutes from "../domains/auth/routes/auth.routes"

const routes: IRouter[] = [authRoutes];

export default routes;
