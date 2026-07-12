
import { serverFetch ,serverMutation} from "../core/server";
import { getAccessToken } from "./token";

import {
  ServiceDetailsResponse,
  ServicesApiResponse,
  CreateServiceInput,
  CreateServiceResponse,
  DeleteServiceResponse,
} from "@/app/types/service";



export const getServices = async (queryParams: string): Promise<ServicesApiResponse> => {
  const token = await getAccessToken()
  return serverFetch<ServicesApiResponse>(`/api/services?${queryParams}`,{},token);
};

export const getServiceDetails = async (id: string): Promise<ServiceDetailsResponse> => {
    const token = await getAccessToken()
  return serverFetch<ServiceDetailsResponse>(`/api/services/${id}`,{},token);
};


// Admin only — create a new service
export const createService = async (
  serviceData: CreateServiceInput
): Promise<CreateServiceResponse> => {
  const token = await getAccessToken();
  return serverMutation<CreateServiceResponse>("/api/services", serviceData, "POST", token);
};

// Admin only — delete a service
export const deleteService = async (id: string): Promise<DeleteServiceResponse> => {
  const token = await getAccessToken();
  return serverMutation<DeleteServiceResponse>(`/api/services/${id}`, {}, "DELETE", token);
};