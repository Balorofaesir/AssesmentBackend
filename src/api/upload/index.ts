import { Router } from 'express';
import multer = require('multer');
import { uploadMultipleHandler,uploadHandler } from './upload.controller';

const router = Router();
const upload = multer({ dest: './temp' })

router.post('/file', upload.single('file'), uploadHandler)
router.post('/files', upload.array('files'), uploadMultipleHandler)

export default router ;