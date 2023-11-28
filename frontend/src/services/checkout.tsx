import axios from "axios"
import URL from "../utils/constants"


axios.defaults.withCredentials = true

const checkout = async(token:string|null) => {
    const config = {
        headers:{Authorization:token}
        
    }
        const response = await axios.post(`${URL}/checkout`,null,config)
        return response.data

    
}

export default checkout