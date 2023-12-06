import axios from "axios"
import BASEURL from "../utils/constants"



const baseUrl = `${BASEURL}/cart`
axios.defaults.withCredentials = true


const addToCart = async(product:string,token:string|null) => {
    const config = {
        headers:{Authorization:token}
    }
    const response  = await axios.put(`${baseUrl}/add/${product}`,{product:product},config)

    return response.data
}

const deleteAllProduct = async(product:string,token:string|null) => {
    const config = {
        headers:{Authorization:token}
    }
    const response = await axios.put(`${baseUrl}/delete/${product}`,{product:product},config)

    return response.data
}

const deleteOneCart = async(product:string,token:string|null) => {
    
    const config = {
        headers:{Authorization:token}
    }
    const response = await axios.put(`${baseUrl}/decrease/${product}`,{product:product},config)

    return response.data
}

const getCart = async(token:string|null) => {
    const config = {
        headers:{Authorization:token}
    }
    try{const response = await axios.get(`${baseUrl}/user-cart`,config)
    return response.data
    }catch(error){
        console.log(error)
    }
}

export {
    addToCart,
    deleteAllProduct,
    deleteOneCart,
    getCart
}