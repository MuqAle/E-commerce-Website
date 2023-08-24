import express from 'express'
import { deleteProduct, getAllProducts,getProduct, addProduct } from '../controller/inventory-controller'
import upload from '../config/multer-config'



const productRouter = express.Router()

productRouter.get('/', getAllProducts)

productRouter.get('/:id',getProduct)

productRouter.delete('/:id',deleteProduct)

productRouter.post('/', upload.array('images', 3),addProduct)

export default productRouter