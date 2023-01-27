import { Router } from 'express';

import { isAuthenticated, hasRole } from '../../auth/auth.services';

import {
  handleAllGetEvents,
  handleCreateEvent,
  handleDeleteEvent,
  handleGetEventById,
  // handleUpdateEvent,
  // handleDeleteEventByName
} from './events.controller';

const router = Router();
// RESTful API

// GET /api/events
router.get('/', handleAllGetEvents);
// GET /api/events/:id
router.get('/:id',isAuthenticated,hasRole(['ADMIN', 'USER']), handleGetEventById);
// POST /api/events
router.post('/', isAuthenticated, hasRole(['ADMIN', 'USER']), handleCreateEvent);
// PATCH /api/events/:id
// router.patch('/:id', isAuthenticated, hasRole(['ADMIN', 'USER']), handleUpdateEvent);
// DELETE /api/events/:id
router.delete('/:id', isAuthenticated, hasRole(['ADMIN', 'USER']), handleDeleteEvent);

export default router;
