export async function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) {
    console.warn('⚠️ Service Worker not supported');
    return null;
  }

  try {
    const registration = await navigator.serviceWorker.register('/sw.js');
    console.log('Service Worker registered:', registration);

    handleSWUpdate(registration);

    return registration;
  } catch (err) {
    console.error('Service Worker registration failed:', err);
    return null;
  }
}

function handleSWUpdate(registration: ServiceWorkerRegistration) {
  registration.onupdatefound = () => {
    const newWorker = registration.installing;

    if (!newWorker) return;

    newWorker.onstatechange = () => {
      if (newWorker.state === 'installed') {
        if (navigator.serviceWorker.controller) {
          console.log('Service Worker update available (refresh page)');
        } else {
          console.log('Service Worker installed for first time');
        }
      }
    };
  };
}
