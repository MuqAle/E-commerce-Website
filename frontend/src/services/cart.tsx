import axios from "axios";

const baseUrl = 'http://localhost:3003/api/cart'

const addToCart = async(product:string) => {
    const response  = await axios.put(`${baseUrl}/add/${product}`)
    return response.data
}

const deleteProductCart = async(product:string) => {
    const response = await axios.put(`${baseUrl}/delete/${product}`)
    return response.data
}

const deleteOneCart = async(product:string) => {
    const response = await axios.put(`${baseUrl}/decrease/${product}`)
    return response.data
}

export {
    addToCart,
    deleteProductCart,
    deleteOneCart
}