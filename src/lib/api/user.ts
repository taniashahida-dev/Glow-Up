import {
  User,
  UpdateUserRoleInput,
  UpdateUserRoleResponse,
  DeleteUserResponse,
} from "@/app/types/user";
import { serverFetch, serverMutation } from "../core/server";
import { getAccessToken } from "./token";

// Admin only — list all users
export const getUsers = async (): Promise<User[]> => {
  const token = await getAccessToken();
  return serverFetch<User[]>("/api/users", {}, token);
};

// Admin only — toggle a user's role between "user" and "admin"
export const updateUserRole = async (
  id: string,
  data: UpdateUserRoleInput
): Promise<UpdateUserRoleResponse> => {
  const token = await getAccessToken();
  return serverMutation<UpdateUserRoleResponse>(`/api/users/${id}`, data, "PATCH", token);
};

// Admin only — delete a user account
export const deleteUser = async (id: string): Promise<DeleteUserResponse> => {
  const token = await getAccessToken();
  return serverMutation<DeleteUserResponse>(`/api/users/${id}`, {}, "DELETE", token);
};