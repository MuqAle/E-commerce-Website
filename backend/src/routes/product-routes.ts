import express from 'express'
import { deleteProduct, getAllProducts,getProduct, addProduct, updatedProducts, getFrontPageProducts} from '../controllers/product-controller'
import upload from '../middleware/multer-middleware'
import { isAdmin, userExtractor } from '../middleware/jwt-middleware'



const productRouter = express.Router()

productRouter.get('/',getAllProducts)

productRouter.get('/front-page-products',getFrontPageProducts)

productRouter.get('/:id',getProduct)

productRouter.delete('/:id',userExtractor,isAdmin,deleteProduct)

productRouter.post('/',userExtractor, isAdmin,upload.array('images', 3),addProduct)

productRouter.put('/:id',userExtractor,isAdmin,upload.array('images', 3),updatedProducts)



export default productRouter