import { Outlet } from 'react-router';
import { Header } from '@/components/header';
import NotificationPermission from '@/components/NotificationPermission';
import NotificationScheduler from '@/components/NotificationScheduler';

export default function CommonLayout() {
  return (
    <div className='max-w-7xl mx-auto  '>
      <NotificationPermission />
      <NotificationScheduler />
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
