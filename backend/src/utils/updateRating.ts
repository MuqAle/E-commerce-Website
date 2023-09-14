import Product from "../models/product-model"

const updatedRating = async (id:string) => {

    const getAllReviews = await Product.findById(id)
        const totalReviews = getAllReviews?.reviews?.length
        let actualRating
        const reviewSum = getAllReviews?.reviews?.map((product) => product.rating)
        .reduce((prev,curr) => prev + curr, 0)
        if(reviewSum && totalReviews){
             actualRating = (reviewSum/totalReviews).toFixed(1)
        }
        const finalProduct = await Product.findByIdAndUpdate(id,{
            overallRating:actualRating
        },{
            new:true
        })

        return finalProduct
}

export default updatedRating