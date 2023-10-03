import axios from "axios"
const baseUrl = 'http://localhost:3003/api/login'

const login = async (credentials:{
    email:string,
    password:string
}) => {
    const response = await axios.post(baseUrl,credentials) 
    return response.data
}

export default login