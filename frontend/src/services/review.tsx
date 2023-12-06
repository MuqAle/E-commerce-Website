import axios from "axios"
import URL from "../utils/constants"

const baseUrl = `${URL}/user-req`



const postReview = async(product:string, review:{
  reviewDesc:string,
  reviewTitle:string,
  rating:number|null
},token:string) => {
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
    const response = await axios.put(`${baseUrl}/delete-reviews/${product}`,{product:product},config)

    return response.data
}


export {
    postReview,
    deleteReview
}
