import { RecursivePartial } from "../../../types";
import { CreateServiceDto } from "./createService.dto";

export type UpdateServiceDto = RecursivePartial<CreateServiceDto>;
