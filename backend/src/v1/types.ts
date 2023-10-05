import {Role, Gender, AccountStatus } from "@prisma/client"

export type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};

export default interface AccountType {
  id: string;
  name: string;
  last_name: string;
  email: string;
  password: string;
  role?: Role;
  avatar_url?: string;
  contact_info: {
    country: string;
    state: string;
    city: string;
    street: string;
    suite: string;
    primary_phone: string;
    secondary_phone?: string;
  };
  birthday: string;
  gender: Gender;
  status: AccountStatus;
}
