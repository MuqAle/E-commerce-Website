import axios from "axios"
const baseUrl = 'http://localhost:3003/api/users'

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