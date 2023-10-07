import { ServiceStatus } from "@prisma/client";

export interface CreateServiceDto {
	id: undefined,
	name: string,
	status: ServiceStatus,
	duration: string,
	price: number,
}
