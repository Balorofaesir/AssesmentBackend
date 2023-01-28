import { Request, Response, NextFunction } from 'express';
import Event from './events.model';

import { AuthRequest } from '../../auth/auth.types';
import {
  getAllEventsBycreator,
  getEventById,
  createEvent,
  // updateEvent,
  deleteEvent,
} from './events.services'

export async function handleGetAllEventsByCreator(req: AuthRequest, res: Response, next: NextFunction) {
  const { id } = req.params;
  const user = req.user;
  
  try {
   const AllEventsByUser = await getAllEventsBycreator(user?._id)
    if (!AllEventsByUser) {
      return res.status(404).json({ message: 'Not authorized user' });
    }
      return res.status(200).json(AllEventsByUser);
  } catch (error) {
      console.log(error);
      return res.status(500).json(error);
  }
}

export async function handleGetEventById(req: AuthRequest, res: Response, next: NextFunction) {
  const { id } = req.params;
  const user = req.user;

  const event = await getEventById(id, user?._id);

  if (!event || event.length < 1) {
    return res.status(404).json({ message: 'Event not found' });
  }

  return res.status(200).json(event);
}

export async function handleCreateEvent(req: AuthRequest, res: Response, next: NextFunction) {
  const data = req.body;
  const user = req.user
  try {
    const event = {
      ...data,
      createdBy:user?._id,
  }
    const Newevent = await createEvent(event);

    return res.status(201).json(Newevent);
  } catch (error) {
    return res.status(500).json(error);
  }
}

// export async function handleUpdateEvent(req: Request, res: Response, next: NextFunction) {
//   const { id } = req.params;
//   const data = req.body;

//   const event = await updateEvent(id, data);

//   if (!event) {
//     return res.status(404).json({ message: 'Event not found' });
//   }

//   return res.status(200).json(event);
// }

export async function handleDeleteEvent(req: AuthRequest, res: Response,  next: NextFunction) {
  const { id } = req.params;
  const user = req.user;
  
  try {
   const deleted = await deleteEvent(id, user?._id )
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
