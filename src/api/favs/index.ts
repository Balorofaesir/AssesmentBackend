import { Router } from 'express';

import { isAuthenticated, hasRole } from '../../auth/auth.services';

import {
  handleGetAllFavsByCreator,
  handleCreateFav,
  handleDeleteFav,
  handleGetFavById,
  handleAddFav,
  handleDeleteSingleFav
} from './favs.controller';

const router = Router();
// RESTful API

// GET /api/favs
router.get('/', handleGetAllFavsByCreator);
// GET /api/favs/:id
router.get('/:id',isAuthenticated,handleGetFavById);
// POST /api/favs
router.post('/', isAuthenticated,handleCreateFav);
// PATCH /api/favs/:id (adding an event)
router.patch('/:id', isAuthenticated, handleAddFav);
// PATCH /api/favs/delete/:id (delete a single element of the array of favorites)
router.patch('/delete/:id', isAuthenticated, handleDeleteSingleFav);
// DELETE /api/favs/:id
router.delete('/:id', isAuthenticated, handleDeleteFav);

export default router;
