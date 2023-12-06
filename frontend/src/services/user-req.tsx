import axios from "axios"
import BASEURL from "../utils/constants"
const baseUrl = `${BASEURL}/user-req`
axios.defaults.withCredentials = true

const addOrDeleteFromWishlist = async(product:string,token:string|null) => {

    const config = {
        headers:{Authorization:token}
    }

    const response  = await axios.put(`${baseUrl}/wishlist/${product}`,{product:product},config)

    return response.data
}

const retrieveProfile = async(token:string|null) => {

    const config = {
        headers:{Authorization:token}
    }
    const response = await axios.get(`${baseUrl}/profile`,config)

    return response.data
}


export {
    addOrDeleteFromWishlist,
    retrieveProfile,
}