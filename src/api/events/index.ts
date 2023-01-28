import { Router } from 'express';

import { isAuthenticated, hasRole } from '../../auth/auth.services';

import {
  handleGetAllEventsByCreator,
  handleCreateEvent,
  handleDeleteEvent,
  handleGetEventById,
  // handleUpdateEvent,
} from './events.controller';

const router = Router();
// RESTful API

// GET /api/events
router.get('/',isAuthenticated, handleGetAllEventsByCreator);
// GET /api/events/:id
router.get('/:id',isAuthenticated, handleGetEventById);
// POST /api/events
router.post('/', isAuthenticated, handleCreateEvent);
// PATCH /api/events/:id
// router.patch('/:id', isAuthenticated, hasRole(['ADMIN', 'USER']), handleUpdateEvent);
// DELETE /api/events/:id
router.delete('/:id', isAuthenticated, handleDeleteEvent);

export default router;
