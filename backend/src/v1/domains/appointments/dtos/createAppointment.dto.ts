import { AppointmentStatus } from "@prisma/client"

export type CreateAppointmentDto = {
	patient_id: string,
	doctor_id: string,
	description?: string,
	report_url?: string,
	status?: AppointmentStatus,
	date: string,
	start_time: string,
	end_time: string,
	room: string,
	services: string[]
}
