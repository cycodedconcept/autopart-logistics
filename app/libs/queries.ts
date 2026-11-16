// TanStack Query hooks for the logistics company dashboard.
// Hooks return the unwrapped `data` from the API envelope; mutations return the full
// response so callers can show `message` in a toast.
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useAuthStore } from "@/store/authStore";
import { CreateRiderInput, JobsParams, RequestPayoutInput, RidersParams } from "@/types/api";
import { LoginFormData, RegisterFormData } from "@/types/auth";
import { authApi, earningsApi, jobsApi, ridersApi, zonesApi } from "./api";

export const queryKeys = {
  me: ["logistics", "me"] as const,
  zones: ["logistics", "zones"] as const,
  jobs: {
    all: ["logistics", "jobs"] as const,
    list: (params: JobsParams) => ["logistics", "jobs", params] as const,
  },
  riders: {
    all: ["logistics", "riders"] as const,
    list: (params: RidersParams) => ["logistics", "riders", params] as const,
  },
  earnings: ["logistics", "earnings"] as const,
};

// Several components on a page read the same lists (e.g. the bell and the dashboard both
// read jobs), so treat data as fresh briefly instead of refetching on every mount
const LIST_STALE_TIME = 30 * 0;

// Only fetch protected data once there's a session
const useHasSession = () => Boolean(useAuthStore((s) => s.token));

// ----- Auth -----

export function useLogin() {
  const setSession = useAuthStore((s) => s.setSession);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: LoginFormData) => authApi.login(body),
    onSuccess: ({ data }) => {
      // Drop anything cached for a previous company before storing the new session
      queryClient.clear();
      setSession(data.company, data.token);
    },
  });
}

export function useRegister() {
  const setSession = useAuthStore((s) => s.setSession);

  return useMutation({
    mutationFn: (body: RegisterFormData) => authApi.register(body),
    onSuccess: ({ data }) => setSession(data.company, data.token),
  });
}

export function useLogout() {
  const clearSession = useAuthStore((s) => s.clearSession);
  const queryClient = useQueryClient();

  return () => {
    clearSession();
    queryClient.clear();
  };
}

export function useMe() {
  return useQuery({
    queryKey: queryKeys.me,
    queryFn: () => authApi.me(),
    select: (res) => res.data.company,
    enabled: useHasSession(),
  });
}

export function useZones() {
  return useQuery({
    queryKey: queryKeys.zones,
    queryFn: () => zonesApi.list(),
    select: (res) => res.data.zones,
    // Zones rarely change
    staleTime: 60 * 60 * 0,
    enabled: useHasSession(),
  });
}

// ----- Jobs & dashboard -----

export function useJobs(params: JobsParams = {}) {
  return useQuery({
    queryKey: queryKeys.jobs.list(params),
    queryFn: ({ signal }) => jobsApi.list(params, signal),
    select: (res) => res.data,
    placeholderData: keepPreviousData,
    staleTime: LIST_STALE_TIME,
    enabled: useHasSession(),
  });
}


const JOBS_LIMIT = 10;
const ALL_JOBS: JobsParams = { status: "all", page: 1, limit: JOBS_LIMIT };

export function useCompanyJobs() {
  return useJobs(ALL_JOBS);
}

// ----- Riders -----

export function useRiders(params: RidersParams = {}) {
  return useQuery({
    queryKey: queryKeys.riders.list(params),
    queryFn: ({ signal }) => ridersApi.list(params, signal),
    select: (res) => res.data,
    placeholderData: keepPreviousData,
    staleTime: LIST_STALE_TIME,
    enabled: useHasSession(),
  });
}

// All of the company's riders, for screens that filter and page on the client
const ALL_RIDERS: RidersParams = { status: "all", page: 1, limit: 10 };

export function useAllRiders() {
  return useRiders(ALL_RIDERS);
}

export function useCreateRider() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: CreateRiderInput) => ridersApi.create(body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.riders.all }),
  });
}

export function useSuspendRider() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (riderId: number) => ridersApi.suspend(riderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.riders.all });
      // Suspending can move the rider's open jobs to someone else
      queryClient.invalidateQueries({ queryKey: queryKeys.jobs.all });
    },
  });
}

// ----- Earnings & payouts -----

export function useEarnings() {
  return useQuery({
    queryKey: queryKeys.earnings,
    queryFn: () => earningsApi.get(),
    select: (res) => res.data,
    staleTime: LIST_STALE_TIME,
    enabled: useHasSession(),
  });
}

export function useRequestPayout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: RequestPayoutInput) => earningsApi.requestPayout(body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.earnings }),
  });
}
