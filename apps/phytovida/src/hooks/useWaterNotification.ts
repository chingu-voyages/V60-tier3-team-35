export function useWaterNotifications() {
  const sendNotification = (plant?: string, image?: string) => {
    if (Notification.permission !== 'granted') return;

    new Notification('Watering Reminder', {
      body: plant
        ? `It's time to water your ${plant}`
        : "It's time to water your plants",
      icon: image || '/src/assets/leaf.png',
    });
  };

  return { sendNotification };
}
// 🌱
