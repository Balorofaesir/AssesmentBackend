import fs from 'fs';
import { uploadImage } from './upload.services';
import { Request,Response, NextFunction } from 'express';

export async function uploadHandler(req:Request, res: Response, next:NextFunction) {
  const { path, size } =req.file as Express.Multer.File
  const maxSize = 1080 * 1920 * 5
  if(size > maxSize){
    fs.unlinkSync(path)
    return res.status(400).json({message:' File is too large'})
  }

  try {
    const result = await uploadImage(path)
    res.json(result)
  } catch (error:any) {
    return res.status(500).json({ message: error.message})
  }finally{
    fs.unlinkSync(path)
  }
}

export async function uploadMultipleHandler(req:Request,res:Response,next:NextFunction){
  const files = req.files as Express.Multer.File[]

  const results = []
  for (const file of files) {
    const { path } = file
    try {
      const result = await uploadImage(path)
      results.push(result)
    } catch (error:any) {
      return res.status(500).json(error.message)
    } finally {
      fs.unlinkSync(path)
    }
  }

  return res.status(200).json(results)

}