import { Schema, model, Document, SchemaType } from "mongoose";

export interface FavDocument extends Document {
  title: string;
  name: string;
  description: string;
  link: string;
  favoriteEvents: Array<object>;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

const FavSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    favoriteEvents: {
      type: Array,
      items: {
        type: Object,
        properties: {
          _id: String,
          name: String,
          date: Date,
          country: String,
          city: String,
        },
      },
    },
    link: {
      type: String,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Fav = model<FavDocument>("favs", FavSchema);

export default Fav;
