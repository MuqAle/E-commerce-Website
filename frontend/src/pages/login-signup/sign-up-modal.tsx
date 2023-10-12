import { useImmer } from "use-immer"
import { LoginTypes} from "../../utils/types"
import { motion } from "framer-motion"
import SignInForm from "./sign-in"
import SignUpForm from "./sign-up"
import '../../style/css/login.css'


const backdrop = {
    visible:{opacity:1},
    hidden:{opacity:0},
    exit:{opacity:0}
  }

const LoginModal = ({user,closeModal}:
    {user:LoginTypes | null,
    closeModal:() => void}) => {

    const [showSignIn, setShowSignIn] = useImmer(true)
    
    return(
        <motion.div
        variants={backdrop}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="modal" onClick={closeModal}>
        <div className="sign-in" onClick={e => e.stopPropagation()}>
        <button className="close-modal sign-in-close" onClick={closeModal}>&times;</button>
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
    </motion.div>
    ) 
}

export default LoginModal