import { useQuery } from '@tanstack/react-query';
import { readUserPlants, userPlantsKeys } from '@/api';
import { useApiClient } from '@/lib/authFetch';

export const useUserPlants = (page = 1, limit = 10) => {
  const { apiClient } = useApiClient();

  return useQuery({
    queryKey: userPlantsKeys.list(page),
    queryFn: () => readUserPlants(apiClient.get, page, 10),
    select: (res: any) => res?.data,
  });
};
