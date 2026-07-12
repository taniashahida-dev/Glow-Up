"use server";

import { headers } from "next/headers";
import { auth } from "../auth";

export const getAccessToken = async (): Promise<string | undefined> => {
  const tokenData = await auth.api.getToken({
    headers: await headers(),
  });

  return tokenData?.token;
};