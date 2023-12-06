import axios from "axios"
import BASEURL from "../utils/constants"
const baseUrl = `${BASEURL}/users`

const createAccount = async(credentials:{
    firstName:string,
    lastName:string
    email:string,
    password:string
}) => {
    const response = await axios.post(baseUrl,credentials)

    return response.data
}

export {
    createAccount
}