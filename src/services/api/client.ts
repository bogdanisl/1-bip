import { useSelectedBipStore } from "@/src/hooks/use-selected-bip";
import { ApiResponse } from "./types";
import { Bip } from "@/src/types/Bip";
import { showMessage } from "react-native-flash-message";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface RequestConfig {
  body?: unknown;
  headers?: Record<string, string>;
  method?: HttpMethod;
  timeout?: number; // 👈 NOWE
}

// 👇 helper do timeoutu
const fetchWithTimeout = async (
  url: string,
  options: RequestInit,
  timeout = 10000 // default 10s
) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(id);
    return response;
  } catch (error: any) {
    clearTimeout(id);

    if (error.name === "AbortError") {
      throw new Error("TIMEOUT");
    }

    throw error;
  }
};

export async function apiRequest<T>(
  endpoint: string,
  config: RequestConfig = {},
  bip?: Bip
): Promise<T> {
  const selectedBip = bip ?? useSelectedBipStore.getState().selectedBip;

  if (!selectedBip) {
    showMessage({
      message: "Błąd konfiguracji",
      description: "Brak wybranego BIP",
      type: "danger",
    });

    throw new Error("NO_BIP");
  }

  const { method = "POST", body, headers, timeout } = config;

  try {
    const response = await fetchWithTimeout(
      `${selectedBip.url}${endpoint}`,
      {
        method,
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
      },
      timeout
    );

    const json = await response.json();

    if (!response.ok) {
      showMessage({
        message: "Błąd serwera",
        description: json?.message || "Wystąpił błąd",
        type: "danger",
      });

      throw new Error("HTTP_ERROR");
    }

    const parsed: ApiResponse<T> = json;
    return parsed.data;

  } catch (error: any) {
    // 👇 obsługa timeoutu
    if (error.message === "TIMEOUT") {
      showMessage({
        message: "Timeout",
        description: "Serwer nie odpowiedział na czas",
        type: "warning",
      });
    } else {
      showMessage({
        message: "Błąd sieci",
        description: "Sprawdź połączenie internetowe",
        type: "danger",
      });
    }

    throw error;
  }
}