import { RecursivePartial } from "../../../types";
import { CreateRecepcionistDto } from "./createRecepcionist.dto";

export type UpdateRecepcionistDto = RecursivePartial<CreateRecepcionistDto>
