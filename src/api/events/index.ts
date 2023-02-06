import { Router } from 'express';

import { isAuthenticated, hasRole } from '../../auth/auth.services';

import {
  handleGetAllEventsByCreator,
  handleCreateEvent,
  handleDeleteEvent,
  handleGetEventById,
  handleGetEventBycreatorById,
  handleAllGetEvents,
  // handleUpdateEvent,
} from './events.controller';

const router = Router();
// RESTful API

// GET /api/events/all
router.get('/all', handleAllGetEvents);
// GET /api/events
router.get('/',isAuthenticated, handleGetAllEventsByCreator);
// GET /api/events/all/:id
router.get('/all/:id', handleGetEventById);
// GET /api/events/:id
router.get('/:id',isAuthenticated, handleGetEventBycreatorById);
// POST /api/events
router.post('/', isAuthenticated, handleCreateEvent);
// PATCH /api/events/:id
// router.patch('/:id', isAuthenticated, hasRole(['ADMIN', 'USER']), handleUpdateEvent);
// DELETE /api/events/:id
router.delete('/:id', isAuthenticated, handleDeleteEvent);

export default router;
