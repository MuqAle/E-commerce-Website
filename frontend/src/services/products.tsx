import axios from "axios"
import { ProductDb } from "../utils/types"
import BASEURL from "../utils/constants"
const baseUrl = `${BASEURL}/products`



const setToken = (newToken:string) => {
 const token = `Bearer ${newToken}`
 return token
}

const getAllProducts = async(query:string) => {
     
    const response = await axios.get(`${baseUrl}${query}`)
    return response.data
}

const getOneProduct = async(product:string) => {
    const response = await axios.get(`${baseUrl}/${product}`)
    return response.data
}

const addProduct = async(newProduct:ProductDb,token:string) => {
    const config = {
        headers:{Authorization:token}
      }
      const response = await axios.post(baseUrl, newProduct, config)

      return response.data
}

const deleteProduct = async(product:string,token:string) => {
    const config = {
        headers:{Authorization:token}
      }
      const response = await axios.delete(`${baseUrl}/${product}`,config)

      return response.data
}

const updateProduct = async(product:string,updatedProduct:ProductDb,token:string) => {

    const config = {
        headers:{Authorization:token}
      }
      const response = await axios.put(`${baseUrl}/${product}`,updatedProduct,config)
      return response.data
}

export {
    setToken,
    getAllProducts,
    addProduct,
    deleteProduct,
    updateProduct,
    getOneProduct
}