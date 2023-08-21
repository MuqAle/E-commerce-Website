import Product from "../models/inventory";
import allData from "../assets/data/all-products";
import {readFileSync} from 'fs'


const importData = async () => {
    for (const entry of allData){
        const {name,type,idProduct,price,onSale,salePercentage,description,Gallery} = entry

        const path = __dirname.replace('/utils','')

        const imageBuffers = Gallery.map((imgUrl) => readFileSync(path + '/assets/imgs/' + imgUrl))
        
        const product = new Product({
            name,
            idProduct,
            type,
            price,
            onSale,
            salePercentage,
            description,
            images:imageBuffers

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