import PasswordInput from "./password"
import { LoginTypes} from "../../utils/types"
import { useImmer } from "use-immer"
import login from "../../services/login"

interface LoginForm {
    emailError:string,
    passwordError:string,
    serverError:string
}

const SignInForm = ({user}:{user:LoginTypes | null}) => {
    const [email,setEmail] = useImmer('')
    const [password,setPassword] = useImmer('')
    const [rememberMe,setRememberMe] = useImmer(false)
    const [errors,setError] = useImmer<Partial<LoginForm>>({})

    const signInFunction = async (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setError({})
        const credentials = {
            email,
            password
        }
        const newErrors: Partial<LoginForm> = {}
        const validRegex = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
        try{
            if(email === '' && password === '' || (!validRegex.test(email) && password === '')){
                newErrors.emailError = 'Please enter a valid email'
                newErrors.passwordError = 'Please enter a password'
                setError(newErrors)
                return
            }
            if(email === '' || !validRegex.test(email)){
                newErrors.emailError = 'Please enter a valid email'
                setError(newErrors)
                return
            }
            if(password === ''){
                newErrors.passwordError = 'Please enter a password'
                setError(newErrors)
                return
            }else{
                user = await login(credentials)
                if(rememberMe){
                    window.localStorage.setItem('loggedUser',JSON.stringify(user))
                }else{
                    window.sessionStorage.setItem('loggedUser',JSON.stringify(user))
                }
                newErrors.serverError = 'You are now logged in. You will be redirected shortly'
                setError(newErrors)
                location.reload()
        }
            }catch(error){
                newErrors.passwordError = 'Wrong email or password, please try again'
                setError(newErrors)
            }
            
    }
    return (
        <form className="sign-in-form">
        <div className={`input-container ${errors.emailError ? 'error' : ''}` }>
            <label htmlFor="sign-in-email">
                Email<span>*</span>
            </label>
            <input id="sign-in-email" type='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
            {errors.emailError && <p className="error">{errors.emailError}</p>}
        </div>
        <div className="password-input-container">
        <PasswordInput id = 'sign-in-password' value= {password} errors={errors.passwordError} className={`input-container ${errors.passwordError ? 'error' : ''}`}  inputName="Password" name="password" setPassword={
            (e) =>  setPassword(e.target.value) } />
        <div className= 'remember-me-container'>
        <input type="checkbox" checked ={rememberMe} onChange = {() => setRememberMe(!rememberMe)} id="remember-me-checkbox"/>
        <label htmlFor="remember-me-checkbox">Remember me</label>
        </div>
        </div>
        <button type="submit" className="sign-in-submit" onClick={signInFunction}>Submit</button>
        {errors.serverError && <p className="error">{errors.serverError}</p>}
    </form> 
    )
}

export default SignInForm