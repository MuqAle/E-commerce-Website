import { useImmer } from "use-immer"


const PasswordInput = ({ 
    id,name,value,setPassword}: 
    {   id: string,
        name:string,
        value:string
        setPassword:React.ChangeEventHandler<HTMLInputElement>
    }) => {
    const [passwordType,setPasswordType] = useImmer(true)

    const togglePassword = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setPasswordType(!passwordType)
    }
    return(
    <div className="input-container">
        <label htmlFor ={id}>
            {name}<span>*</span>
        </label>
        <div>
            <input id={id} value={value} type={passwordType ? 'password' : 'text'} onChange={setPassword} required={true}/>
        <button onClick={togglePassword}>
         {passwordType ? 'SHOW' : 'HIDE'}
        </button>
        </div>
    </div>
    )
}

export default PasswordInput