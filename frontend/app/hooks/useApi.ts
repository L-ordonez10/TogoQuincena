import axiosInstance from "@/lib/axios";
import { Solicitud, SolicitudResponse } from "@/lib/types/solicitudes";
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
  UseMutationOptions,
} from "@tanstack/react-query";
import { AxiosError } from "axios";

type HttpMethod = "post" | "put" | "patch" | "delete";

interface FileUploadResponse {
  message: string;
  filePath: string;
}

interface CreateApplicationPayload {
  personal: Record<string, unknown>;
  uploads: Record<string, unknown>;
  references: Array<Record<string, unknown>>;
  salary: string;
  source: string;
  legal: Record<string, unknown>;
}

const APPLICATIONS_QUERY_KEY = "applications";
const APPLICATION_QUERY_KEY = "application";
const FILE_UPLOAD_ENDPOINT = "/file-upload/upload";
const APPLICATIONS_ENDPOINT = "/applications";

export const useGetData = <T>(
  endpoint: string,
  queryKey: (string | number)[],
  options?: Omit<UseQueryOptions<T, AxiosError>, "queryKey" | "queryFn">
) => {
  return useQuery<T, AxiosError>({
    queryKey,
    queryFn: async () => {
      const { data } = await axiosInstance.get<T>(endpoint);
      return data;
    },
    ...options,
  });
};

export const useMutateData = <TData, TVariables, TContext = unknown>(
  endpoint: string,
  method: HttpMethod = "post",
  invalidateKeys?: string[],
  options?: Omit<
    UseMutationOptions<TData, AxiosError, TVariables, TContext>,
    "mutationFn"
  >
) => {
  const queryClient = useQueryClient();

  return useMutation<TData, AxiosError, TVariables, TContext>({
    mutationFn: async (variables) => {
      const { data } = await axiosInstance[method]<TData>(endpoint, variables);
      return data;
    },

    onSuccess: (data, variables, onMutateResult, context) => {
      invalidateKeys?.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: [key] });
      });

      options?.onSuccess?.(
        data,
        variables,
        onMutateResult,
        context
      );
    },

    ...options,
  });
};

export const useCreateApplication = () => {
  return useMutateData<Solicitud, CreateApplicationPayload>(
    APPLICATIONS_ENDPOINT,
    "post",
    [APPLICATIONS_QUERY_KEY]
  );
};

export const useSolicitudes = () => {
  return useGetData<SolicitudResponse>(APPLICATIONS_ENDPOINT, [
    APPLICATIONS_QUERY_KEY,
  ]);
};

export const useSolicitud = (id?: number, enabled = true) => {
  const shouldEnable = typeof id === "number" && id > 0 && enabled;
  const endpoint = id ? `${APPLICATIONS_ENDPOINT}/${id}` : "";
  const queryKey: (string | number)[] =
    typeof id === "number" && id > 0
      ? [APPLICATIONS_QUERY_KEY, id]
      : [APPLICATIONS_QUERY_KEY];
  return useGetData<Solicitud>(endpoint, queryKey, { enabled: shouldEnable });
};

export const useFileUpload = () => {
  return useMutation<FileUploadResponse, AxiosError, FormData>({
    mutationFn: async (formData: FormData) => {
      const { data } = await axiosInstance.post<FileUploadResponse>(
        FILE_UPLOAD_ENDPOINT,
        formData
      );
      return data;
    },
  });
};
