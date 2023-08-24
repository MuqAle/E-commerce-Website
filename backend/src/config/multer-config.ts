import { Request } from "express";
import multer, { FileFilterCallback } from "multer";

// const path =  __dirname.replace('/config','')

const storage = multer.diskStorage({
    destination: (_req,_file,cb) => {
        cb(null, 'public/uploads/')
    },
    filename: (_req,file,cb) => {
        cb(null,new Date().toISOString() + file.originalname)
    }
})

const fileFilter = (_req:Request,file:Express.Multer.File,cb:FileFilterCallback) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg'  ){
        cb(null,true)
    }else{
        cb(null,false)
        const err = new Error('Only jpeg, png, or jpeg format allowed')
        return cb(err)
    }
}


const upload = multer({
    storage:storage,
    limits:{
        fileSize: 1024 * 1024 * 5
    },
    fileFilter:fileFilter
})

export default upload
