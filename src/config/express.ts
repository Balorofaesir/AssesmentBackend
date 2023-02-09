import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';

function configExpress(app: Application): void {
  app.use(cors());
  app.use(express.json());
  app.use(morgan('dev'));
}

export default configExpress;
