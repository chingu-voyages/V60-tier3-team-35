import { Router } from 'express';
import { subscribeController, sendController } from '../controllers/push.js';

const router: Router = Router();

router.post('/subscribe', subscribeController);
router.post('/send', sendController);

export default router;
