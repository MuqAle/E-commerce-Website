import { useEffect } from "react"
import { LoginTypes } from "../utils/types"
import LoginModal from "./login-signup/sign-up-modal"
import '../style/css/login.css'
const LoginPage = ({user}:{user: null | LoginTypes}) => {

    useEffect(() => {
        if(user){
            location.replace('/user-account/profile')
        }
    })
    return (
        <div className="login-page" >
            <LoginModal user={user}/>
        </div>
    )
}

export default LoginPage