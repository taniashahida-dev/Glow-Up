"use server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

type ServerFetchOptions = RequestInit;

export const serverFetch = async <T>(
  path: string,
  options: ServerFetchOptions = {},
  token?: string,
): Promise<T> => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    (headers as Record<string, string>).Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    throw new Error(`API Error ${res.status}`);
  }

  return res.json() as Promise<T>;
};

export const serverMutation = async <T>(
  path: string,
  data: unknown = {},
  method: "POST" | "PUT" | "PATCH" | "DELETE" = "POST",
  token?: string,
): Promise<T> => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    (headers as Record<string, string>).Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${baseUrl}${path}`, {
    method,
    headers,
    body: JSON.stringify(data),
  });

  const text = await res.text();

  console.log("Status:", res.status);
  console.log("Raw Response:", text);

  if (!res.ok) {
    throw new Error(`API Error ${res.status}: ${text}`);
  }

  return JSON.parse(text) as T;
};
