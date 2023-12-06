import axios from "axios"
import BASEURL from "../utils/constants"


axios.defaults.withCredentials = true

const checkout = async(token:string|null) => {
    const config = {
        headers:{Authorization:token}
        
    }
        const response = await axios.post(`${BASEURL}/checkout`,null,config)
        return response.data

    
}

export default checkout