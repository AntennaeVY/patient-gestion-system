import AccountType from "../../../types";

export type CreateDoctorDto = AccountType & {
  signature_url: string;
  certificate_url: string;
  specialization: string;
  services: string[]
};
