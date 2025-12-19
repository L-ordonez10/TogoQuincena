import axiosInstance from "@/lib/axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Ejemplo de hook para obtener datos
export const useGetData = <T>(endpoint: string, queryKey: string[]) => {
  return useQuery<T>({
    queryKey,
    queryFn: async () => {
      const { data } = await axiosInstance.get<T>(endpoint);
      return data;
    },
  });
};

// Ejemplo de hook para crear/actualizar datos
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

export const useFileUpload = () => {
  return useMutation<{ message: string; filePath: string }, Error, FormData>({
    mutationFn: async (formData: FormData) => {
      try {
        console.log("Enviando archivo al servidor...");
        const response = await axiosInstance.post(
          "/file-upload/upload",
          formData
        );
        console.log("Respuesta del servidor:", response.data);
        return response.data;
      } catch (error) {
        console.error("Error en petición de archivo:", error);
        throw error;
      }
    },
    onSuccess: (data) => {
      console.log("Hook fileUpload - onSuccess:", data);
    },
    onError: (error) => {
      console.error("Hook fileUpload - onError:", error);
    },
  });
};
