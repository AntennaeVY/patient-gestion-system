import { Weekday } from "@prisma/client"

export type CreateDoctorShiftDto = {
	day: Weekday,
	start_time: string,
	end_time: string,
}
