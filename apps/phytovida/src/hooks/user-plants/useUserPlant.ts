import { useQuery } from "@tanstack/react-query";
import { readUserPlant, userPlantsKeys } from "@/api";
import { useApiClient } from "@/lib/authFetch";

export const useUserPlant = (id: string) => {
	const { apiClient } = useApiClient();

	return useQuery({
		queryKey: userPlantsKeys.detail(id),
		queryFn: () => readUserPlant(apiClient.get, id),
		enabled: !!id,
	});
};
