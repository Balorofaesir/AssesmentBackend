import { Application } from 'express';

import authLocal from './auth/local';
import user from './api/user';
import events from './api/events';

function routes(app: Application): void {
  app.use('/api/users', user);
  app.use('/api/events', events);

  // auth routes
  app.use('/auth/local', authLocal);
  // app.use('/auth/facebook', authFacebook);
  // app.use('/auth/google', authGoogle);
  // app.use('/auth/twitter', authTwitter);
  // app.use('/auth/github', authGithub);
}

export default routes;
