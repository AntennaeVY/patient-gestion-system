import { hashString } from "../../../libs/hash";
import { prisma } from "../../../persistence/prisma/client";
import AccountType from "../../types";

export async function registerAccountService(registerDto: AccountType) {
  const { contact_info, ...accountData } = registerDto;

  // Hash password
  const hashedPassword = hashString(accountData.password);
  accountData.password = hashedPassword;

  // Insert in database
  const account = await prisma.account.create({
    data: {
      ...accountData,
      contact: {
        create: contact_info,
      },
    },
  });

  return account;
}
