import type { SignUpFormData, LoginFormData } from "@/app/utils/auth-validation";

export type User = {
  id: string;
  email: string;
  name: string;
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};

export type { SignUpFormData, LoginFormData };

export interface SignUpResponse {
  id: string;
  email: string;
  name: string;
  username: string;
  createdAt: Date;
}