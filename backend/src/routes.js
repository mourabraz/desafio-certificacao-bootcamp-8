import { Router } from 'express';
import Brute from 'express-brute';
import BruteRedis from 'express-brute-redis';
import multer from 'multer';

import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import BannerController from './app/controllers/BannerController';
import MeetupController from './app/controllers/MeetupController';
import MeetupUserController from './app/controllers/MeetupUserController';
import SubscriptionController from './app/controllers/SubscriptionController';
import NotificationController from './app/controllers/NotificationController';

import validateUserStore from './app/validators/UserStore';
import validateSessionStore from './app/validators/SessionStore';
import validateUserUpdate from './app/validators/UserUpdate';
import validateBannerStore from './app/validators/BannerStore';
import validateMeetupStore from './app/validators/MeetupStore';
import validateMeetupUpdate from './app/validators/MeetupUpdate';
import validateSubscriptionStore from './app/validators/SubscriptionStore';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

const bruteStore =
  process.env.NODE_ENV !== 'test'
    ? new BruteRedis({
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
      })
    : null;
const bruteForce =
  process.env.NODE_ENV !== 'test'
    ? new Brute(bruteStore)
    : { prevent: (req, res, next) => next() };

routes.post('/users', validateUserStore, UserController.store);
routes.post(
  '/sessions',
  bruteForce.prevent,
  validateSessionStore,
  SessionController.store
);

routes.use(authMiddleware);

routes.put('/users', validateUserUpdate, UserController.update);

routes.post(
  '/banners',
  upload.single('file'),
  validateBannerStore,
  BannerController.store
);

routes.get('/meetups/user', MeetupUserController.index);

routes.get('/meetups', MeetupController.index);
routes.post('/meetups', validateMeetupStore, MeetupController.store);
routes.put('/meetups/:id', validateMeetupUpdate, MeetupController.update);
routes.delete('/meetups/:id', MeetupController.delete);

routes.get('/subscriptions', SubscriptionController.index);
routes.post(
  '/subscriptions',
  validateSubscriptionStore,
  SubscriptionController.store
);
routes.delete('/subscriptions/:id', SubscriptionController.delete);

routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);

export default routes;
