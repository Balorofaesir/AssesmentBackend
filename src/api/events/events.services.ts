import { DocumentDefinition, FilterQuery } from "mongoose";

import Event, { EventDocument } from "./events.model";

export function getAllEventsBycreator(createdBy: string) {
  console.log({createdBy: createdBy})
    return Event.find({createdBy: createdBy})
  .populate({ path: 'created By', select: 'Username' })
}

export function getAllEvents() {
    return Event.find({})
}

export function getEventBycreatorById(id: string, createdBy: string ) {
  return Event.find({_id: id, createdBy: createdBy})
    .populate({ path: 'createdBy', select: 'Username' })
}
export function getEventById(id: string) {
  const event = Event.findById(id);
  return event;
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

export function deleteEvent(id: string, createdBy: string) {
  return Event.findOneAndRemove({_id: id, createdBy: createdBy});
}