import { UserRole } from "@/types";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getToken = (role: UserRole) => {
  switch (role) {
    case UserRole.User:
      return localStorage.getItem("user_token");
    case UserRole.Admin:
      return localStorage.getItem("admin_token");
    default:
      return null;
  }
};