import { Schema, model, Document, SchemaType } from 'mongoose';

export interface EventDocument extends Document {
  name: string;
  description: string;
  date: Date;
  country: string;
  city: string,
  owner: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  }
}, {
  timestamps: true,
  versionKey: false,
});

const Event = model<EventDocument>('event', EventSchema);

export default Event;
