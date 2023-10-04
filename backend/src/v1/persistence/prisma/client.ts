import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export function exclude<T extends Record<string, any>, Key extends keyof T>(
  model: T,
  keys: Key[]
){
  return Object.fromEntries(
    Object.entries(model).filter(([key]) => !keys.includes(key as Key))
  );
}
