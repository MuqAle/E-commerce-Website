import axios from "axios"
import BASEURL from "../utils/constants"
const baseUrl = `${BASEURL}/orders`

const getOneOrder = async(order:string) => {

    const response = await axios.get(`${baseUrl}/${order}`)
    return response.data
}

export {
    getOneOrder
}