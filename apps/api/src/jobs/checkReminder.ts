import { db } from '../db/index.js';
import { plants, usersPlants } from '../db/schema.js';
import { eq } from 'drizzle-orm';
import { sendPush } from '../services/push.js';

export const runCheckReminder = async () => {
  const data = await db
    .select({
      plantName: plants.name,
      plantImg: plants.imageUrl,
      lastWateredDate: usersPlants.lastWateredDate,
      wateringFrequency: usersPlants.wateringFrequency,
      userId: usersPlants.userId,
    })
    .from(usersPlants)
    .leftJoin(plants, eq(usersPlants.plantId, plants.id));

  const now = new Date();
  const plantsToWater = data.filter((plant) => {
    if (!plant.lastWateredDate || !plant.wateringFrequency) return false;

    const last = new Date(plant.lastWateredDate);
    const next = new Date(last);
    next.setDate(next.getDate() + plant.wateringFrequency);

    return now >= next;
  });

  // console.log('NEED WATER:', plantsToWater.length);

  for (const plant of plantsToWater) {
    await sendPush({
      userId: plant.userId,
      title: plant.plantName,
      body: 'Time to water your plant',
      icon: plant.plantImg,
    });
  }
};
