import multer from 'multer'; 
import express from 'express';
import path from 'path';
import fs from 'fs'
const router = express.Router();
import Upload from '../models/uploadModel.js'
import { v4 as uuidV4 } from 'uuid';
import dotenv from 'dotenv'

dotenv.config()


const mimeTypes = process.env.MIME_TYPES.trim().split(',')


const fileNameFormat = (file) => `${file.fieldname}-${Date.now()}${uuidV4()}${path.extname(file.originalname)}`

const storage = multer.diskStorage({
  destination(req, file, cb) {
    const uploadPath = process.env.UPLOAD_PATH || 'uploads'
    fs.exists(uploadPath, exist => {
    if (!exist) {
      return fs.mkdir(uploadPath, error => cb(error, uploadPath))
    }
    return cb(null, uploadPath)
    })
  },
  filename(req, file, cb) {
    cb(
      null,
      fileNameFormat(file)
    )
  },
})

const upload = multer({
 storage,
  fileFilter: (req, file, callback) => {
    callback(null, mimeTypes.includes(file.mimetype))
  },
})


router.post('/', upload.single('file'), async (req, res) => {
  try {
   if(req.file === undefined) {
     return res.status(400).json({message: `MimeType : ${mimeTypes}`}) 
    } 

    const  filePath = req.file !== null ? req.file.path : null
    const uploadFile = new Upload({
      file: filePath
    })

    const newUpload = await uploadFile.save()
    res.status(200).json(newUpload)
  } catch (err){
    fs.unlink(path.join(uploadPath, req.file), (error) => {
      if (error) throw Error("Error")
    })
  }
})

export default router