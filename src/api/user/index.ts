import { Router } from 'express';

import { isAuthenticated } from '../../auth/auth.services';

import {
  handleAllGetUsers,
  handleCreateUser,
  handleDeleteUser,
  handleGetUser,
  handleUpdateUser,
  handleGetMe,
} from './user.controller';

const router = Router();

// RESTful API

// GET /api/users
router.get('/', handleAllGetUsers);
// GET /api/users/:id
// router.get('/:id', handleGetUser);
// POST /api/users/me
router.get('/me', isAuthenticated, handleGetMe);
// POST /api/users
router.post('/', handleCreateUser);
// PATCH /api/users/:id
router.patch('/edit/:id', handleUpdateUser);
// DELETE /api/users/:id
router.delete('/:id', isAuthenticated, handleDeleteUser);

export default router;
