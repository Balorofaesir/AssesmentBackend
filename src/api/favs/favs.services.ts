import { DocumentDefinition, FilterQuery } from "mongoose";

import Fav, { FavDocument } from "./favs.model";

export function getAllFavsBycreator(createdBy: string) {
  console.log({ createdBy: createdBy });

  return Fav.find({ createdBy: createdBy }).populate({
    path: "createdBy",
    select: "Username",
  });
}

export function getFavById(id: string, createdBy: string) {
  return Fav.find({ _id: id, createdBy: createdBy }).populate({
    path: "createdBy",
    select: "Username",
  });
  // .populate('createdBy');
}

export async function searchFav(filter?: FilterQuery<FavDocument>) {
  const favs = filter ? await Fav.find(filter) : await Fav.find();
  return favs;
}

export async function createFav(
  input: DocumentDefinition<Omit<FavDocument, "createdAt" | "updatedAt">>
) {
  return Fav.create(input);
}

export function addSingleFav(id: string, createdBy: string, data: object) {
  return Fav.findOneAndUpdate(
    { _id: id, createdBy: createdBy },
    { $push: data },
    { new: true }
  );
}

export function deleteSingleFav(id: string, createdBy: string, data: object) {
  return Fav.findOneAndUpdate(
    { _id: id, createdBy: createdBy },
    //had to pass all the same values of the object in the array to be able to erase
    {
      $pull: { favoriteEvents: { $in: [data] }},
    },
    { new: true }
  );
}

export function deleteFav(id: string, createdBy: string) {
  return Fav.findOneAndRemove({ _id: id, createdBy: createdBy });
}
