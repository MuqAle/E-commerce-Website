import axios from "axios"
import BASEURL from "../utils/constants"

axios.defaults.withCredentials = true

const login = async (credentials:{
    email:string,
    password:string
}) => {
    const response = await axios.post(`${BASEURL}/login`,credentials) 
    return response.data
}

export default login