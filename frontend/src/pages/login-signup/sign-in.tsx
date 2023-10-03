import PasswordInput from "./password"
import { LoginTypes} from "../../utils/types"
import { useImmer } from "use-immer"
import login from "../../services/login"

const SignInForm = ({user}:{user:LoginTypes | null}) => {
    const [email,setEmail] = useImmer('')
    const [password,setPassword] = useImmer('')
    const [error,setError] = useImmer('')
    const [emailError,setEmailError] = useImmer('')

    const signInFunction = async (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setError('')
        setEmailError('')
        const credentials = {
            email,
            password
        }
        const validRegex = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
        try{
            if(email === '' && password === '' ){
                setEmailError('Please enter a valid email')
                setError('Please enter a password')
                return
            }
            if(email === '' || !validRegex.test(email)){
                return setEmailError('Please enter a valid email')
            }
            if(password === ''){
                return setError('Please enter a password')
            }else{
                user = await login(credentials)
                window.localStorage.setItem('loggedUser',JSON.stringify(user))
                setEmail('')
                setPassword('')
        }
            }catch(error){
                if(error instanceof Error){
                    setError('Wrong email or password')
                }
                
            }
          
    }

    return (
        <form>
        <div className="input-container">
            <label htmlFor="sign-in-email">
                Email<span>*</span>
            </label>
            <input id="sign-in-email" type='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
            <p>{emailError}</p>
        </div>
        <PasswordInput id = 'sign-in-password' value= {password} name="Password" setPassword={
            (e) =>  setPassword(e.target.value) } />
        <p>{error}</p>
        <button type="submit" onClick={signInFunction}>Submit</button>
        
    </form> 
    )
}

export default SignInForm