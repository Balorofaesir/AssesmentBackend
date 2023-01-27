import { DocumentDefinition, FilterQuery } from "mongoose";

import Event, { EventDocument } from "./events.model";

export function getAllEvents() {
  return Event.find({})
}

export function getEventById(id: string) {
  return Event.findById(id)
    .populate({ path: 'createdBy', select: 'Username' })
    .populate({ path: 'owner', select: 'Username' });
    // .populate('createdBy');
}

export async function searchEvent(filter?: FilterQuery<EventDocument>) {
  const events = filter ? await Event.find(filter) : await Event.find();
  return events;
}

export async function createEvent(
  input: DocumentDefinition<Omit<EventDocument, 'createdAt' | 'updatedAt'>>,
) {
  return Event.create(input);
}

export function updateEvent(
  id: string,
  event: DocumentDefinition<Omit<EventDocument, 'createdAt' | 'updatedAt'>>,
) {
  return Event.findByIdAndUpdate(id, event, { new: true });
}

export function deleteEvent(id: string) {
  return Event.findByIdAndRemove(id);
}

// export function deleteEventByname(id: string, userId: string
//   ) {

//   const deletedUser = Event.findOneAndDelete({_id: id, createdBy: userId});
    
//   return deletedUser;
// }
