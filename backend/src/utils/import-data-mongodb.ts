import Product from "../models/product-model";
import allData from "../assets/data/all-products";
import {v4 as uuidv4} from 'uuid'
import {v2 as cloudinary } from 'cloudinary';
import { CLOUDINARY_KEY,CLOUDINARY_NAME,CLOUDINARY_SECRET } from './../config/config';


cloudinary.config({ 
  cloud_name: CLOUDINARY_NAME, 
  api_key: CLOUDINARY_KEY, 
  api_secret: CLOUDINARY_SECRET 
});



const importData = async() => {
    for (const entry of allData){
        const {name,type,price,onSale,salePercentage,description,stock,metal,colors,images} = entry
        const uuid = uuidv4()

        const path = __dirname.replace('/utils','')

        // const imageBuffers: Buffer[] = images.map((imgUrl:string) => readFileSync(path + '/assets/imgs/' + imgUrl))
        
        const imagePath = await Promise.all(
            images.map(async file => {
                try{
                    const image = await cloudinary.uploader.upload(path + '/assets/imgs/' + file,
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
            }))

        
       const product = new Product({
            name,
            type,
            price,
            onSale,
            salePercentage,
            stock,
            metal,
            colors,
            description,
            images:imagePath,
            imageFolder: uuid
        })
        try{
            await product.save()
            console.log(`Product:${name} has been added to MongoDB`)
        }catch(error){
            if(error instanceof Error){
                console.log('Error: could not be uploaded')
            }
        }
        
    }

    console.log('inventory has been saved to MongoDb')
}

export default importData