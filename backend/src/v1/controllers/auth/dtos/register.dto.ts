export default interface RegisterDto {
	name: string,
	last_name: string,
	email: string,
	password: string,
	role?: string,
	avatar_url?: string,
	contact_info?: {
		country: string,
		state: string, 
		city: string,
		street: string,
		suite: string,
		primary_phone: string,
		secondary_phone?: string
	},
	birthday: string,
	gender: string
}
