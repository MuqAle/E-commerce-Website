import { useImmer } from "use-immer"


const PasswordInput = ({ 
    id,name,value,setPassword,className,errors,inputName}: 
    {   id: string,
        value:string,
        className:string,
        name:string,
        inputName:string
        errors:string|undefined
        setPassword:React.ChangeEventHandler<HTMLInputElement>,
    }) => {
    const [passwordType,setPasswordType] = useImmer(true)

    const togglePassword = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setPasswordType(!passwordType)
    }
    return(
    <div className={className}>
        <label htmlFor ={id}>
            {inputName}<span>*</span>
        </label>
        <div className="password-container">
            <input id={id} value={value} type={passwordType ? 'password' : 'text'} name={name} onChange={setPassword} required={true}/>
        <button onClick={togglePassword}>
         {passwordType ? 'SHOW' : 'HIDE'}
        </button>
        </div>
        {errors && <p className="error">{errors}</p>}
    </div>
    )
}

export default PasswordInput