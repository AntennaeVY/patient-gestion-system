import { RecursivePartial } from "../../../types";
import { CreateAppointmentDto } from "./createAppointment.dto";

export type UpdateAppointmentDto = RecursivePartial<CreateAppointmentDto>;
