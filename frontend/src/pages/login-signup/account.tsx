import { useImmer } from "use-immer"
import { LoginTypes} from "../../utils/types"
import SignInForm from "./sign-in"
import accountSignUp from "./sign-up"
import '../../style/css/login.css'



const LoginPage = ({user}:{user:LoginTypes | null}) => {
    const [showSignIn, setShowSignIn] = useImmer(true)
    
    return(
        <div className="sign-in">
            <div className="sign-in-btn-container">
                <button onClick={() => setShowSignIn(true)}>Sign In</button>
                <button onClick={() => setShowSignIn(false)}>Sign Up</button>
            </div>
        {showSignIn ?
            <SignInForm user={user}/>
           :
            accountSignUp()
         }
    </div>
    ) 
}

export default LoginPage