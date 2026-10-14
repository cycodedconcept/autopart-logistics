// Client for the logistics endpoints of the AutoPart API.
// Docs: https://documenter.getpostman.com/view/15386056/2sBXwyH7vT (folder "logistics")
import { useAuthStore } from "@/store/authStore";
import {
  ApiPayout,
  ApiResponse,
  ApiRider,
  CreateRiderInput,
  DeliveryJob,
  EarningsData,
  JobsData,
  JobsParams,
  RequestPayoutInput,
  RiderAvailability,
  RidersData,
  RidersParams,
  SuspendRiderData,
  UpdateJobStatusInput,
  Zone,
} from "@/types/api";
import { LoginData, LoginFormData, RegisterFormData } from "@/types/auth";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://autoparts.zubitechnologies.com/api/v1";

export class ApiError extends Error {
  status: number;
  // e.g. "AUTH_REQUIRED"
  code?: string;
  body: unknown;

  constructor(message: string, status: number, body: unknown, code?: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.body = body;
  }
}

type Query = Record<string, string | number | boolean | null | undefined>;

interface RequestOptions {
  method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  body?: unknown;
  query?: Query;
  // Defaults to the logged-in company's token; pass a token to act as someone else (e.g. a rider)
  token?: string | null;
  signal?: AbortSignal;
}

const buildUrl = (path: string, query?: Query) => {
  const url = new URL(`${API_BASE_URL}${path}`);
  Object.entries(query ?? {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, String(value));
    }
  });
  return url.toString();
};

export async function request<T>(
  path: string,
  { method = "GET", body, query, token, signal }: RequestOptions = {}
): Promise<ApiResponse<T>> {
  const authToken = token === undefined ? useAuthStore.getState().token : token;

  const res = await fetch(buildUrl(path, query), {
    method,
    signal,
    headers: {
      Accept: "application/json",
      ...(body !== undefined && { "Content-Type": "application/json" }),
      ...(authToken && { Authorization: `Bearer ${authToken}` }),
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const json = await res.json().catch(() => null);

  if (!res.ok || json?.success === false) {
    // An expired or invalid session: drop it so the app can send the user to login
    if (res.status === 401 && token === undefined) {
      useAuthStore.getState().clearSession();
    }
    // Errors come back as { success: false, error: { code, message } }
    throw new ApiError(
      json?.error?.message ?? json?.message ?? `Request failed with status ${res.status}`,
      res.status,
      json,
      json?.error?.code
    );
  }

  return json as ApiResponse<T>;
}

// ----- Logistics company: auth & profile -----

export const authApi = {
  register: (body: RegisterFormData) =>
    request<LoginData>("/logistics/register", { method: "POST", body, token: null }),

  login: (body: LoginFormData) =>
    request<LoginData>("/logistics/login", { method: "POST", body, token: null }),

  me: () => request<{ company: LoginData["company"] }>("/logistics/me"),
};

// Needs a session, even though the docs mark it as public
export const zonesApi = {
  list: () => request<{ zones: Zone[] }>("/logistics/zones"),
};

// ----- Logistics company: jobs (the dashboard summary comes with this list) -----

export const jobsApi = {
  list: (params: JobsParams = {}, signal?: AbortSignal) =>
    request<JobsData>("/logistics/jobs", { query: { status: "all", ...params }, signal }),
};

// ----- Logistics company: riders -----

export const ridersApi = {
  list: (params: RidersParams = {}, signal?: AbortSignal) =>
    request<RidersData>("/logistics/riders", { query: { status: "all", ...params }, signal }),

  create: (body: CreateRiderInput) =>
    request<{ rider: ApiRider }>("/logistics/riders", { method: "POST", body }),

  suspend: (riderId: number) =>
    request<SuspendRiderData>(`/logistics/riders/${riderId}/suspend`, { method: "PATCH" }),
};

// ----- Logistics company: earnings & payouts -----

export const earningsApi = {
  get: () => request<EarningsData>("/logistics/earnings"),

  requestPayout: (body: RequestPayoutInput) =>
    request<{ payout: ApiPayout }>("/logistics/payouts", { method: "POST", body }),
};

// ----- Rider app -----
// These act as the rider, so they need the rider's own token from riderApi.login,
// not the company token.

export const riderApi = {
  login: (body: LoginFormData) =>
    request<{ token: string; rider: ApiRider }>("/rider/login", {
      method: "POST",
      body,
      token: null,
    }),

  me: (token: string) => request<{ rider: ApiRider }>("/rider/me", { token }),

  setAvailability: (token: string, status: RiderAvailability) =>
    request<{ rider: ApiRider }>("/rider/availability", {
      method: "PATCH",
      body: { status },
      token,
    }),

  jobs: (token: string, status?: DeliveryJob["status"]) =>
    request<{ jobs: DeliveryJob[] }>("/rider/jobs", { query: { status }, token }),

  job: (token: string, jobId: number) => request<DeliveryJob>(`/rider/jobs/${jobId}`, { token }),

  updateJobStatus: (token: string, jobId: number, body: UpdateJobStatusInput) =>
    request<DeliveryJob>(`/rider/jobs/${jobId}/status`, { method: "PATCH", body, token }),
};
