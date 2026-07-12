export type UserRole = "user" | "admin";

export interface User {
  _id: string;
  name?: string;
  email: string;
  role: UserRole;
  createdAt?: string;
  updatedAt?: string;
}

export interface UpdateUserRoleInput {
  role: UserRole;
}

export interface UpdateUserRoleResponse {
  acknowledged: boolean;
  matchedCount: number;
  modifiedCount: number;
}

export interface DeleteUserResponse {
  acknowledged: boolean;
  deletedCount: number;
}