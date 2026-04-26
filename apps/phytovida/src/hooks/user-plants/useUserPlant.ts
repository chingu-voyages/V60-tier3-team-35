import { useMutation, useQuery } from "@tanstack/react-query";
import { createUserPlant, readUserPlant, userPlantsKeys } from "@/api";
import { useApiClient } from "@/lib/authFetch";
import type { CreateUserPlant } from "@/api/user-plants/user.plant.types";

export const useUserPlant = (id: string) => {
	const { apiClient } = useApiClient();

	return useQuery({
		queryKey: userPlantsKeys.detail(id),
		queryFn: () => readUserPlant(apiClient.get, id),
		enabled: !!id,
	});
};

type ApiError = {
	status?: number;
	message: string;
};

export const useCreateUserPlant = () => {
	const { apiClient } = useApiClient();
	return useMutation<any, ApiError, CreateUserPlant>({
		mutationFn: (plant: CreateUserPlant) => createUserPlant(apiClient.post, plant)
	})
}