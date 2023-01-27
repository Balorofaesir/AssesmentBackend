import { Request, Response, NextFunction } from 'express';
import Event from './events.model';

import { AuthRequest } from '../../auth/auth.types';
import {
  getAllEvents,
  getEventById,
  createEvent,
  // updateEvent,
  deleteEvent,
} from './events.services'

export async function handleAllGetEvents(req: Request, res: Response, next: NextFunction) {
  const events = await getAllEvents();

  return res.status(200).json(events);
}

export async function handleGetEventById(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;

  const event = await getEventById(id);

  if (!event) {
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
  console.log(data)
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
  const query = { _id: id, createdBy: user?._id}
  console.log(user?._id)
  try {
   const delet = await Event.findOneAndDelete(query)
    if (!delet) {
      return res.status(404).json({ message: 'Not authorized user' });
    }
      return res.status(200).json(delet);
  } catch (error) {
      console.log(error);
      return res.status(500).json(error);
  }
}
