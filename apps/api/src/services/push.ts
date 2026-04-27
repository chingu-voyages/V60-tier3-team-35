import webpush from '../config/webpush.js';
import type { PushSubscription } from 'web-push';

type PushPayload = {
  title: string;
  body: string;
  icon?: string;
};

const subscriptions = new Map<string, PushSubscription>();

export const addSubscription = (sub: PushSubscription) => {
  if (!sub?.endpoint) return;
  subscriptions.set(sub.endpoint, sub);
};

export const sendPush = async (payload: PushPayload) => {
  if (subscriptions.size === 0) {
    console.log('No subscriptions');
    return;
  }

  for (const [endpoint, sub] of subscriptions.entries()) {
    try {
      await webpush.sendNotification(sub, JSON.stringify(payload));
      console.log('✅ sent to', endpoint);
    } catch (err: any) {
      console.error('PUSH ERROR', {
        endpoint,
        status: err.statusCode,
        body: err.body,
      });

      if (err.statusCode === 404 || err.statusCode === 410) {
        subscriptions.delete(endpoint);
      }
    }
  }
};
