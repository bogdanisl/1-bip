import { useSelectedBipStore } from "@/src/hooks/use-selected-bip";
import { ApiResponse } from "./types";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface RequestConfig {
  body?: unknown;
  headers?: Record<string, string>;
  method?: HttpMethod;
}

export async function apiRequest<T>(
  endpoint: string,
  config: RequestConfig = {}
): Promise<T> {
  const selectedBip = useSelectedBipStore.getState().selectedBip;

  if (!selectedBip) {
    throw {
      status: 500,
      message: "There is no selected BIP",
    };
  }

  const { method = "POST", body, headers } = config;

  const response = await fetch(`${selectedBip.url}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error('Network Error')
  }

  const parsed: ApiResponse<T> = json;
  return parsed.data;
}