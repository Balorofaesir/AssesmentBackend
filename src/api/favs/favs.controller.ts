import { Request, Response, NextFunction } from 'express';

import { AuthRequest } from '../../auth/auth.types';
import {
  getAllFavsBycreator,
  getFavById,
  createFav,
  addSingleFav,
  deleteFav,
  deleteSingleFav
} from './favs.services'

export async function handleGetAllFavsByCreator(req: AuthRequest, res: Response, next: NextFunction) {
  const { id } = req.params;
  const user = req.user;
  
  try {
   const AllFavsByUser = await getAllFavsBycreator(user?._id)
    if (!AllFavsByUser) {
      return res.status(404).json({ message: 'Not authorized user' });
    }
      return res.status(200).json(AllFavsByUser);
  } catch (error) {
      console.log(error);
      return res.status(500).json(error);
  }
}

export async function handleGetFavById(req: AuthRequest, res: Response, next: NextFunction) {
  const { id } = req.params;
  const user = req.user;

  const fav = await getFavById(id, user?._id);

  if (!fav || fav.length < 1) {
    return res.status(404).json({ message: 'Fav not found' });
  }

  return res.status(200).json(fav);
}

export async function handleCreateFav(req: AuthRequest, res: Response, next: NextFunction) {
  const data = req.body;
  const user = req.user
  try {
    const fav = {
      ...data,
      createdBy:user?._id,
  }
    const Newfav = await createFav(fav);

    return res.status(201).json(Newfav);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export async function handleAddFav(req: AuthRequest, res: Response, next: NextFunction) {
  const { id } = req.params;
  const data = req.body;
  const user = req.user

  try {
    const UpdatedFavList = await addSingleFav(id, user?._id, data );
    console.log(UpdatedFavList)

    return res.status(201).json(UpdatedFavList);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export async function handleDeleteSingleFav(req: AuthRequest, res: Response, next: NextFunction) {
  const { id } = req.params;
  const data = req.body;
  const user = req.user

  try {
    const UpdatedFavList = await deleteSingleFav(id, user?._id, data );
    return res.status(201).json(UpdatedFavList);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export async function handleDeleteFav(req: AuthRequest, res: Response,  next: NextFunction) {
  const { id } = req.params;
  const user = req.user;
  
  try {
   const deleted = await deleteFav(id, user?._id )
   console.log("deleted:",deleted)
    if (!deleted) {
      return res.status(404).json({ message: 'Not authorized user' });
    }
      return res.status(200).json(deleted);
  } catch (error) {
      console.log(error);
      return res.status(500).json(error);
  }
}
