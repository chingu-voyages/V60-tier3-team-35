import type { Request, Response } from 'express';
import { addSubscription, sendPush } from '../services/push.js';
import { sendResponse } from '../helper/response.js';

// Subscribe
export const subscribeController = (req: Request, res: Response) => {
  try {
    if (!req.body?.endpoint) {
      return sendResponse(res, 400, {
        error: true,
        message: 'Subscription object is missing endpoint',
        success: false,
      });
    }

    addSubscription(req.body);

    return sendResponse(res, 201, {
      error: false,
      message: 'Subscribed',
      success: true,
    });
  } catch (err) {
    console.error('SUBSCRIBE_ERROR:', err);

    return sendResponse(res, 500, {
      error: true,
      message: 'Subscribe failed',
      success: false,
    });
  }
};

// Send push
export const sendController = async (req: Request, res: Response) => {
  try {
    const { title, body } = req.body;

    if (!title || !body) {
      return sendResponse(res, 400, {
        error: true,
        message: 'Title and body are required',
        success: false,
      });
    }

    await sendPush(req.body);

    return sendResponse(res, 200, {
      error: false,
      message: 'Push sent',
      success: true,
    });
  } catch (err) {
    console.error('SEND_PUSH_ERROR:', err);

    return sendResponse(res, 500, {
      error: true,
      message: 'Send failed',
      success: false,
    });
  }
};
