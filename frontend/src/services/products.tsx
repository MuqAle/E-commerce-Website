import axios from "axios"
import { ProductDb } from "../utils/types"
const baseUrl = 'http://localhost:3003/api/products'



const setToken = (newToken:string) => {
 const token = `Bearer ${newToken}`
 return token
}

const getAllProducts = async() => {
    const response = await axios.get(baseUrl)
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
    updateProduct
}