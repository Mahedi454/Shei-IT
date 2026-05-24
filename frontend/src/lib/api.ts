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

  const contentType = response.headers.get("content-type") ?? "";
  const payload = contentType.includes("application/json")
    ? ((await response.json()) as ApiResponse<T>)
    : null;

  if (!response.ok) {
    if (response.status >= 500) {
      throw new Error("Something went wrong on our side. Please try again later.");
    }

    throw new Error(payload?.message || "Request failed.");
  }

  if (!payload) {
    throw new Error("Unexpected server response.");
  }

  return payload.data;
};
