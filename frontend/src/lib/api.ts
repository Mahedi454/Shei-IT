export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

type ApiOptions = RequestInit & {
  token?: string;
};

export const apiRequest = async <T>(path: string, options: ApiOptions = {}) => {
  const { token, headers, ...init } = options;

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  });

  const payload = (await response.json()) as ApiResponse<T>;

  if (!response.ok) {
    throw new Error(payload.message || "Request failed.");
  }

  return payload.data;
};
