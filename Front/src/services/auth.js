import { checkResponse } from "@/utils/services";

const { VITE_API_URL: baseUrl } = import.meta.env;

export const login = async (credentials) => {
  const response = await fetch(`${baseUrl}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  return checkResponse(response);
};

export const register = async (data) => {
  const response = await fetch(`${baseUrl}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return checkResponse(response);
};
