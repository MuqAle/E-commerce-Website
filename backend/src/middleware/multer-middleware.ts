import { Request } from "express";
import multer, { FileFilterCallback } from "multer";
import {v4 as uuidv4} from 'uuid'

// const path =  __dirname.replace('/config','')

const uuid = uuidv4()

const storage = multer.diskStorage({
    filename: (_req,_file,cb) => {
        cb(null,new Date().toISOString() + uuid)
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
