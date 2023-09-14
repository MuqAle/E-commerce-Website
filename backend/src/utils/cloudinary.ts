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
                        width:925,
                        height:725, 
                        crop: "fill"
                    })
                return image.secure_url
            }catch(error){
                return console.log(error)
            }
        })
    )

    return imagePath
}

const deleteImage = async(filePath:string) => {
    await cloudinary.api.delete_resources_by_prefix(filePath,{
        type:'upload'
    })
    await cloudinary.api.delete_folder(filePath)
}



const updateImages = async(filePath:string,uuid:string,files:Express.Multer.File[]) => {

    await cloudinary.api.delete_resources_by_prefix(filePath,{
        type:'upload'
    })

    const newImages = await uploadImage(files,uuid)

    return newImages
}

export {uploadImage,deleteImage,updateImages}
