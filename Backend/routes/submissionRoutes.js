import express from "express";
import multer from "multer";
import path from "path";
const router=express.Router()
import { submitAssignment } from "../controller/submissionController.js";

import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';





cloudinary.config();

const storage = new CloudinaryStorage({
  cloudinary,
   upload_preset: 'public',
  params: async (req, file) => {
    
    return {
     resource_type: 'raw',  
     access_mode: "public",           
      folder: 'userUploads',
      format: file.mimetype === 'application/pdf' ? 'pdf' : 'jpg',
      public_id: `${Date.now()}-${file.originalname.split('.')[0]}`,
    };
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only JPEG, PNG, and PDF files are allowed'), false);
  }
};

const upload = multer({ storage, fileFilter });





router.post('/submissions', upload.single('attachment'), submitAssignment);

export default router;
