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

// import { useQuery } from '@tanstack/react-query';
// import { readUserPlants, userPlantsKeys } from '@/api';
// import { useApiClient } from '@/lib/authFetch';

// export const useUserPlants = (page = 1, limit = 10) => {
//   const { apiClient } = useApiClient();

//   return useQuery({
//     queryKey: userPlantsKeys.list(page),

//     queryFn: async () => {
//       console.log('🚀 QUERY START');

//       const res = await readUserPlants(apiClient.get, page, limit);

//       console.log('📦 RAW RESPONSE:', res);

//       return res;
//     },

//     select: (res: any) => {
//       console.log('🎯 SELECT INPUT:', res);

//       const data = res?.data; // 👈 ВОТ ЭТО ПРАВИЛЬНО

//       console.log('🌱 FINAL PLANTS ARRAY:', data);

//       return data;
//     },
//   });
// };
