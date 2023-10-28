import { IRouter } from "express";

import authRoutes from "../domains/auth/routes/auth.routes";
import patientRoutes from "../domains/patients/routes/patient.routes";
import servicesRoutes from "../domains/services/routes/services.routes";
import doctorRoutes from "../domains/doctors/routes/doctor.routes";
import recepcionistRoutes from "../domains/recepcionists/routes/recepcionist.routes";
import doctorShiftsRoutes from "../domains/doctors/subdomains/shifts/routes/doctorShifts.routes"
import appointmentRoutes from "../domains/appointments/routes/appointments.routes";

const routes: IRouter[] = [
  authRoutes,
  patientRoutes,
  servicesRoutes,
  doctorRoutes,
  recepcionistRoutes,
  doctorShiftsRoutes,
  appointmentRoutes
];

export default routes;
