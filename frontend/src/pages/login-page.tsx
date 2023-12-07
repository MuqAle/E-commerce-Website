import { useEffect } from "react"
import { LoginTypes } from "../utils/types"
import LoginModal from "./login-signup/sign-up-modal"
import '../style/css/login.css'
const LoginPage = ({user}:{user: null | LoginTypes}) => {

    useEffect(() => {
        const controller = new AbortController()
        const userStorage = localStorage.getItem('loggedUser') || sessionStorage.getItem('loggedUser')
        if(userStorage){
            location.replace('/user-account/profile')
        }
        return () => {
            controller.abort()
        }
    },[])
    return (
        <div className="login-page" >
            <LoginModal user={user}/>
        </div>
    )
}

export default LoginPage