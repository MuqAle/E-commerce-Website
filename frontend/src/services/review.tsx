import axios from "axios"
import { ReviewType } from "../utils/types"

const baseUrl = 'http://localhost:3003/api/user-req'



const postReview = async(product:string, review:ReviewType,token:string) => {
    const config = {
        headers:{Authorization:token}
      }
    const response = await axios.put(`${baseUrl}/add-reviews/${product}`,review,config)

    return response.data
}

const deleteReview = async(product:string,token:string) =>{
    const config = {
        headers:{Authorization:token}
      }
    const response = await axios.put(`${baseUrl}/delete-reviews/${product}`,config)

    return response.data
}

export {
    postReview,
    deleteReview
}
