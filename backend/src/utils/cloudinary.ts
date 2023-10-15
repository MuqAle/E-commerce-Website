import {v2 as cloudinary } from 'cloudinary';
import { CLOUDINARY_KEY,CLOUDINARY_NAME,CLOUDINARY_SECRET } from './../config/config';


cloudinary.config({ 
  cloud_name: CLOUDINARY_NAME, 
  api_key: CLOUDINARY_KEY, 
  api_secret: CLOUDINARY_SECRET 
});

const uploadImage = async (files:Express.Multer.File[],uuid:string) => {
    
    const imagePath = await Promise.all(
        files.map(async file => {
            try{
                const image = await cloudinary.uploader.upload(file.path,
                    {
                        folder:`online-store/${uuid}`,
                        width:880,
                        height:1050, 
                        crop: "fill"
                    })
                return image.secure_url
                
            }catch(error){
                return error
            }
        })
    ) as string[]

    return imagePath
}

const deleteImage = async(filePath:string) => {
    try{
        await cloudinary.api.delete_resources_by_prefix(filePath,{
            type:'upload'
        })
        await cloudinary.api.delete_folder(filePath)
        return
    }catch(error){
        return error
    }
    
}



const updateImages = async(filePath:string,fullFilePath:string,files:Express.Multer.File[]) => {

    try{
        await cloudinary.api.delete_resources_by_prefix(fullFilePath,{
            type:'upload'
        })
    
        const newImages = await uploadImage(files,filePath) 
    
        return newImages
    }catch(error){
        return error
    }
    
}

export {uploadImage,deleteImage,updateImages}
