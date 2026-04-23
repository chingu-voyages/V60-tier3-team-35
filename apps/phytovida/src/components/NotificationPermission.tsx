// export default function WaterNotification() {
//   const askPermission = async () => {
//     await Notification.requestPermission();
//   };

//   const showNotification = () => {
//     new Notification('Полив 🌱', {
//       body: 'Пора полить растения',
//     });
//   };
// const showNotification = () => {
//   new Notification('Полив 🌱', {
//     body: 'Пора полить растения',
//   });
// };
//   return (
//     <div className='space-x-3 text-center'>
//       <button
//         className='p-4 bg-green-300 text-black rounded-3xl'
//         onClick={askPermission}
//       >
//         Разрешить
//       </button>
//       <button
//         className='p-4 bg-green-300 text-black rounded-3xl'
//         onClick={showNotification}
//       >
//         Показать
//       </button>
//     </div>
//   );
// }
import { useState } from 'react';

export default function WaterNotification() {
  const [permission, setPermission] = useState(Notification.permission);

  const requestPermission = async () => {
    await Notification.requestPermission();
    setPermission(Notification.permission);
  };

  if (permission !== 'default') return null;

  return (
    <div className='fixed bottom-5 right-5 p-4 bg-white/50 backdrop-blur-xs border border-border rounded-2xl text-center blur-sm-in transition-transform duration-500 z-50'>
      <p className='flex items-center gap-1'>
        {/* 🌱 */}
        <img
          src='/src/assets/leaf.png'
          className='w-8 h-8'
        />
        Enable watering reminders
      </p>

      <button
        className='text-link cursor-pointer hover:text-link-hover'
        onClick={requestPermission}
      >
        Enable notifications
      </button>
    </div>
  );
}
