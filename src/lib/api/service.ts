import { Service, ServicesApiResponse } from "@/app/types/service";
import { serverFetch } from "../core/server";


export const getServices = async (queryParams: string): Promise<ServicesApiResponse> => {
  return serverFetch<ServicesApiResponse>(`/api/services?${queryParams}`);
};