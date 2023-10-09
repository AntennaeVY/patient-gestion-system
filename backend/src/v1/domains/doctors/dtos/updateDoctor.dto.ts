import { RecursivePartial } from "../../../types";
import { CreateDoctorDto } from "./createDoctor.dto";

export type UpdateDoctorDto = RecursivePartial<CreateDoctorDto>
