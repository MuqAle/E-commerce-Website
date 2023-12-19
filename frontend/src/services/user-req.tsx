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

const changeProfile = async(firstName:string,lastName:string,currentPassword:string,token:string|null) => {

    const config = {
        headers:{Authorization:token}
    }
    const profile = {
        firstName,
        lastName,
        currentPassword
    }
    const response = await axios.put(`${baseUrl}/change-profile`,profile,config)

    return response.data
}

const changePassword = async(currentPassword:string,newPassword:string,rewriteNewPassword:string, token:string|null) => {

    const config = {
        headers:{Authorization:token}
    }

    const passwordChange = {
        currentPassword,
        newPassword,
        rewriteNewPassword
    }

    const response = await axios.put(`${baseUrl}/change-password`,passwordChange,config)

    return response.data
}


export {
    addOrDeleteFromWishlist,
    retrieveProfile,
    changeProfile,
    changePassword
}