import { useImmer } from "use-immer"
import { LoginTypes} from "../../utils/types"
import SignInForm from "./sign-in"
import SignUpForm from "./sign-up"
import '../../style/css/login.css'




const LoginModal = ({user,closeModal,signUp = true}:
    {user:LoginTypes | null,
    closeModal?:() => void,
    signUp?:boolean}) => {

    const [showSignIn, setShowSignIn] = useImmer<boolean>(signUp)

    console.log(showSignIn)
    
    return(
    
        <div className={closeModal ? "sign-in" : 'login-container'} onClick={e => e.stopPropagation()}>
            {
                closeModal ? <button className="close-modal sign-in-close" onClick={closeModal}>&times;</button> :
                null
            }
        
            <div className="sign-in-btn-container">
                <button className= {`sign-in-btn ${showSignIn ? 'active' : ''}`} onClick={() => setShowSignIn(true)}>Sign In</button>
                <button className={`sign-in-btn ${!showSignIn ? 'active' : ''}`} onClick={() => setShowSignIn(false)}>Sign Up</button>
            </div>
        {showSignIn ?
            <SignInForm user={user}/>
           :
            <SignUpForm user={user}/>
         }
    </div>
    ) 
}

export default LoginModal