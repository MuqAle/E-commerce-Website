import { useImmer } from "use-immer"
import { createAccount } from "../../services/users"
import { LoginTypes } from "../../utils/types"
import login from "../../services/login"
import PasswordInput from "./password"


interface FormData {
    firstName: string
    lastName: string
    email: string
    password: string
    confirmPassword: string
  }

const SignUpForm = ({user}:{user:LoginTypes | null}) => {

    const [formData, setFormData] = useImmer({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
    
      const [errors, setErrors] = useImmer<Partial<FormData>>({});
      const [serverResponse,setServerResponse] = useImmer('')
      const [serverSuccess,setServerSuccess] = useImmer('')
    
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData({
          ...formData,
          [name]: value,
        })
      }
    
      const validateForm = () => {
        const newErrors: Partial<FormData> = {};
    
        if (!formData.firstName) {
          newErrors.firstName = 'First name is required'
        }
    
        if (!formData.lastName) {
          newErrors.lastName = 'Last name is required'
        }
    
        if (!formData.email) {
          newErrors.email = 'Email is required';
        } else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/.test(formData.email)) {
          newErrors.email = 'Invalid email format'
        }
    
        if (!formData.password) {
          newErrors.password = 'Password is required';
        } else if (!/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+])[A-Za-z0-9!@#$%^&*()_+]{8,}$/.test(formData.password)) {
          newErrors.password = 'Password must contain 8 characters, 1 digit, 1 capital letter, and 1 special character '
        }
    
        if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = 'Passwords do not match'
        }
    
        setErrors(newErrors);

        return Object.keys(newErrors).length === 0
      }


    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault()
        setErrors({})
        setServerResponse('')
        setServerSuccess('')
        if (validateForm()) {
            try{
                await createAccount(formData)
                setServerSuccess('Account created you will be redirected shortly')
                user = await login({
                    email:formData.email,
                    password:formData.password
                })
                window.sessionStorage.setItem('loggedUser',JSON.stringify(user))
                location.reload()
            }catch(error){
                setServerResponse('This email is already in use')
            }
    }
  }
    return(
           <div className="sign-up-form-scroll">
             <form className="sign-up-form">
                <div className={`input-container ${errors.firstName ? 'error' : ''}`}>
                    <label htmlFor="sign-up-first-name">
                        First Name<span>*</span>
                    </label>
                    <input id="sign-up-first-name" name="firstName" value={formData.firstName} onChange = {handleChange}/>
                    {errors.firstName && <p className="error">{errors.firstName}</p>}
                </div>
                <div className={`input-container ${errors.lastName ? 'error' : ''}`}>
                    <label htmlFor="sign-up-last-name">
                        Last Name<span>*</span>
                    </label>
                    <input id="sign-up-last-name" name="lastName" value={formData.lastName} onChange={handleChange}/>
                    {errors.lastName && <p className="error">{errors.lastName}</p>}
                </div>
                <div className={`input-container ${errors.email ? 'error' : ''}`}>
                    <label htmlFor="sign-up-email">
                        Email<span>*</span>
                    </label>
                    <input type="email" id="sign-up-email" name="email" value={formData.email} onChange={handleChange} autoComplete="off"/>
                    {errors.email && <p className="error">{errors.email}</p>}
                </div>
              <PasswordInput
              id='sign-up-password'
              inputName='Password'
              name="password"
              errors={errors.password}
              className={`input-container ${errors.password ? 'error' : ''}`}
              value={formData.password}
              setPassword={handleChange}/>
              <PasswordInput
              id='sign-up-second-password'
              inputName="Confirm Password"
              name="confirmPassword"
              errors={errors.confirmPassword}
              className={`input-container ${errors.confirmPassword ? 'error' : ''}`}
              value={formData.confirmPassword} setPassword={handleChange}/>
              <p className="server-error">{serverResponse}</p>
              <p className="server-success" style={{color:'green'}}>{serverSuccess}</p>
                <button className="sign-up-submit" onClick={handleSubmit}>Submit</button>
                </form>
           </div>
    )
}

export default SignUpForm