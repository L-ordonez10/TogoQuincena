import axiosInstance from "@/lib/axios";
import { Solicitud, SolicitudResponse } from "@/lib/types/solicitudes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Ejemplo de hook para obtener datos
export const useGetData = <T>(
  endpoint: string,
  queryKey: (string | number)[]
) => {
  return useQuery<T>({
    queryKey,
    queryFn: async () => {
      const { data } = await axiosInstance.get<T>(endpoint);
      return data;
    },
  });
};

export const useMutateData = <TData, TVariables>(
  endpoint: string,
  method: "post" | "put" | "patch" | "delete" = "post",
  invalidateKeys?: string[]
) => {
  const queryClient = useQueryClient();

  return useMutation<TData, Error, TVariables>({
    mutationFn: async (variables) => {
      const { data } = await axiosInstance[method]<TData>(endpoint, variables);
      return data;
    },
    onSuccess: () => {
      if (invalidateKeys) {
        invalidateKeys.forEach((key) => {
          queryClient.invalidateQueries({ queryKey: [key] });
        });
      }
    },
  });
};

export const useCreateApplication = () => {
  return useMutateData<any, any>("/applications", "post", ["applications"]);
};

export const useSolicitudes = () => {
  return useGetData<SolicitudResponse>("/applications", ["applications"]);
};

export const useSolicitud = (id: number) => {
  return useGetData<Solicitud>(`/applications/${id}`, ["application", id]);
};

export const useFileUpload = () => {
  return useMutation<{ message: string; filePath: string }, Error, FormData>({
    mutationFn: async (formData: FormData) => {
      try {
        const response = await axiosInstance.post(
          "/file-upload/upload",
          formData
        );
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: (data) => {},
    onError: (error) => {},
  });
};
