import Product from "../models/product-model"
import {ProductDb} from "../types/type"
import { Request,Response,NextFunction } from "express"
import {deleteImage} from "../utils/cloudinary"
import { addProductDB, 
    deleteProductReviews, 
    deleteProductSession, 
    deleteProductUser, 
    updateProductDB } from "../services/product-service"
import { PipelineStage} from "mongoose"




interface FilterTypes{
    type: string ,
    price:{ $gte: number, $lte: number } | {$gt:number},
    colors:{ $in: string[] }
    onSale: boolean,
    metal: { $in: string[] }
    $or: (
      { name: { $regex: string , $options: string } } | 
      { type: { $regex: string , $options: string } } | 
      { colors: { $regex: string, $options: string }} | 
      { metal: { $regex: string, $options: string }})[] 
}

const getAllProducts = async (req:Request,res:Response,next:NextFunction)=> {
    const page = req.query.page as string
    const sortBy = req.query.sort as string || '-sold'
    const { category, minPrice, maxPrice,onSale,keyword} = req.query 
    const colors = req.query.colors ? (req.query.colors as string).split(',') : []
    const metal = req.query.metal ? (req.query.metal as string).split(',') : []
    const itemsPerPage = 20
    const skip = (+page - 1) * itemsPerPage
    const filter:Partial<FilterTypes> = {} 
    
    
    try{
        
        if(keyword){
        filter.$or = [
          {name:{$regex:keyword as string,$options:'i'}},
          {type:{$regex:keyword as string,$options:'i'}},
          {colors:{$regex:keyword as string,$options:'i'}},
          {metal:{$regex:keyword as string,$options:'i'}}
        ]
        }
        if(category){
            filter.type = category as string
        }
        if(minPrice){
          filter.price = {$gt:+minPrice}
        }
        if(minPrice && maxPrice){
            filter.price = {$gte: +minPrice, $lte: +maxPrice} 
        }
        if(colors.length > 0){
            filter.colors = { $in: colors }
        }
        if(onSale){
          filter.onSale = onSale === 'true'
        }
        if(metal.length > 0){
            filter.metal = { $in: metal}
        }

        const totalProducts = await Product.countDocuments(filter)


        const filterKeys = ['colors', 'metal', 'priceRange']

        const aggregate:PipelineStage[] = [
          {
            $match: filter 
          },
          {
            $facet: {}  as Record<string, PipelineStage.FacetPipelineStage[]>
          }
        ]

        const facetStage = aggregate[1] as { $facet: Record<string, PipelineStage.FacetPipelineStage[]> }

        for (const filterKey of filterKeys) {
          if (filterKey !== 'priceRange') {
            facetStage.$facet[filterKey] = [
          {
            $unwind: `$${filterKey}`
          },
          {
            $sortByCount: `$${filterKey}`
          },
          {
            $project: {
              _id: 0,
              filter: '$_id',
              count: 1
            }
          },
          {
            $sort: { filter: 1 }
          }
        ]
        } else if (filterKey === 'priceRange') {
          facetStage.$facet[filterKey] = [
          {
            $group: {
              _id: {
                $switch: {
                  branches: [
                    { case: { $gt: ['$price', 30] }, then: 'Above $30' },
                    { case: { $and: [{ $gte: ['$price', 21] }, { $lte: ['$price', 30] }] }, then: '21-$30' },
                    { case: { $and: [{ $gte: ['$price', 11] }, { $lte: ['$price', 20] }] }, then: '11-$20' },
                    { case: { $and: [{ $gte: ['$price', 0] }, { $lte: ['$price', 10] }] }, then: '1-$10' },
                  ],
                  default: 'No products found'
                }
              },
              count: { $sum: 1 }
            }
          },
          {
            $project: {
              _id: 0,
              filter: '$_id',
              count: 1
            }
          },
          {
            $sort: { filter: 1 }
          }
          ]
          }
        } 



        const productAggregate = await Product.aggregate(aggregate).exec()
        

        const product:ProductDb[] = await Product.find(filter)
            .sort(sortBy)
            .skip(skip)
            .limit(20)
            .exec()
          res.status(200).json({product,totalProducts,productAggregate})
    }catch(error){
        next(error)
    } 
}

const getProduct = async(req:Request,res:Response,next:NextFunction) => {
    try{
        const product = await Product.findById(req.params.id).populate('reviews.postedBy',{firstName:1,lastName:1})
        if(product){
            res.status(200).json(product)
        }else{
            res.status(404).end()
        }
    }catch(error){
        next(error)
    }
}

const getFrontPageProducts = async(_req:Request,res:Response,next:NextFunction) => {

  const limit = 7

  try{
    const newProducts = await Product.find({})
    .sort('-createdAt')
    .limit(limit)
    .exec()
  
  const onSaleProducts = await Product.find({onSale:true})
    .sort('-stock')
    .limit(limit)
    .exec()

  const trendingProducts = await Product.find({})
    .sort('-sold')
    .limit(limit)
    .exec()
  
  if(!newProducts || !onSaleProducts || !trendingProducts){
    res.status(404).end()
  }else{
    res.status(200).json({newProducts,onSaleProducts,trendingProducts})
  }

  }catch(error){
    next(error)
  }

}

const addProduct = async (req:Request,res:Response,next:NextFunction) => {
    try{
        const body = req.body as ProductDb
        const files = req.files as Express.Multer.File[]

        const saveProduct = await addProductDB(body,files)

        res.status(201).json(saveProduct)
    }catch(error){
        next(error)
    }
}


const deleteProduct = async(req:Request,res:Response,next:NextFunction) => {
    try{
        const {id} = req.params
        const product = await Product.findById(id)
        const fullFolderPath = `online-store/${product?.imageFolder}/`

        if(product){
            await deleteProductSession(product,id)
            await deleteProductReviews(id)
            await deleteProductUser(product,id)
            await deleteImage(fullFolderPath)

            await Product.findByIdAndRemove(req.params.id)

            res.status(204).end()
        }else{
            res.status(404).json({Error:'Item Not Found'})
        }

    }catch(error){
        next(error)
    }
}

const updatedProducts = async (req:Request,res:Response,next:NextFunction) => {
    try{
        const {id} = req.params
        const body = req.body as ProductDb
        const files = req.files as Express.Multer.File[]

        const changeProduct = await updateProductDB(body,id,files)

        if(!changeProduct){
            res.status(404).json({Error:'Item Not Found'})
        }else{
            res.json(changeProduct)
        }
        
    }catch(error){
        next(error)
    }
}


export {
    getAllProducts,
    getProduct,
    deleteProduct,
    addProduct,
    updatedProducts,
    getFrontPageProducts
}