import { useEffect } from 'react';
import { useUserPlants } from '@/hooks/user-plants/useUserPlants';
import { useWaterNotifications } from '@/hooks/useWaterNotification';

export default function NotificationScheduler() {
  const { data: plants } = useUserPlants();
  const { sendNotification } = useWaterNotifications();

  const checkWater = (plant: {
    plantName: string;
    plantImg: string;
    lastWateredDate: Date;
    wateringFrequency: number;
  }) => {
    console.log('plantName: ', plant.plantName);
    const currentDate = new Date();
    const nextWateringDate = new Date();
    const lastWateredDate = new Date(plant.lastWateredDate);

    nextWateringDate.setDate(
      lastWateredDate.getDate() + plant.wateringFrequency,
    );

    return currentDate >= nextWateringDate;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!plants) return;

      plants.forEach((plant: any) => {
        const needWater = checkWater(plant);

        if (needWater) {
          sendNotification(plant.plantName, plant.plantImg);
        }
      });
    }, 60 * 10000);

    return () => clearInterval(interval);
  }, [plants, sendNotification]);

  return null;
}
