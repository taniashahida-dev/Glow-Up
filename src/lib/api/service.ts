import {   ServiceDetailsResponse, ServicesApiResponse } from "@/app/types/service";
import { serverFetch } from "../core/server";
import { getAccessToken } from "./token";


export const getServices = async (queryParams: string): Promise<ServicesApiResponse> => {
  const token = await getAccessToken()
  return serverFetch<ServicesApiResponse>(`/api/services?${queryParams}`,{},token);
};

export const getServiceDetails = async (id: string): Promise<ServiceDetailsResponse> => {
    const token = await getAccessToken()
  return serverFetch<ServiceDetailsResponse>(`/api/services/${id}`,{},token);
};