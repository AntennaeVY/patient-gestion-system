import { IRouter } from "express";
import authRoutes from "./auth.routes"

const routes: IRouter[] = [authRoutes];

export default routes;
