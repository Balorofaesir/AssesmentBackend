import { Request, Response, NextFunction } from "express";

import { AuthRequest } from "../../auth/auth.types";
import {
  getAllEventsBycreator,
  getEventById,
  getEventBycreatorById,
  createEvent,
  getAllEvents,
  // updateEvent,
  deleteEvent,
} from "./events.services";

export async function handleAllGetEvents(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // console.log("Estoy en el siguiente middleware", req.body);
  try {
    const users = await getAllEvents();
    return res.status(200).json(users);
  } catch (error) {
    console.log("getAllEvents-error", error);
    return res.status(500).json(error);
  }
}

export async function handleGetAllEventsByCreator(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;
  const user = req.user;

  try {
    const AllEventsByUser = await getAllEventsBycreator(user?._id);
    if (!AllEventsByUser) {
      return res.status(404).json({ message: "Not authorized user" });
    }
    return res.status(200).json(AllEventsByUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

export async function handleGetEventById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;

  const event = await getEventById(id);

  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }
  return res.status(200).json(event);
}

export async function handleGetEventBycreatorById(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;
  const user = req.user;

  const event = await getEventBycreatorById(id, user?._id);

  if (!event || event.length < 1) {
    return res.status(404).json({ message: "Event not found" });
  }
  return res.status(200).json(event);
}

export async function handleCreateEvent(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const data = req.body;
  const user = req.user;
  try {
    const event = {
      ...data,
      createdBy: user?._id,
    };
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

export async function handleDeleteEvent(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;
  const user = req.user;

  try {
    const deleted = await deleteEvent(id, user?._id);
    console.log("deleted:", deleted);
    if (!deleted) {
      return res.status(404).json({ message: "Not authorized user" });
    }
    return res.status(200).json(deleted);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}
