import { useImmer } from "use-immer"
import { changeProfile,changePassword } from "../../services/user-req"
import axios from "axios"
import { useEffect } from "react"
import PasswordInput from "../login-signup/password"
import '../../style/css/profile-info.css'


interface ProfileType {
    firstName:string | undefined,
    lastName:string | undefined,
    email:string,
    token:string|null
}

interface ProfileChange {
    firstName:string,
    lastName:string,
    currentPassword:string
}


const Profile = ({firstName,lastName,email,token}:ProfileType) => {

    const [showProfileForm,setShowProfileForm] = useImmer(false)
    const [profileForm,setProfileForm] = useImmer({
        firstName:firstName || '',
        lastName:lastName || '',
        currentPassword:''
    })

    const [lastProfileForm,setLastProfileForm] = useImmer({
        firstName:'',
        lastName:'',
        currentPassword:''
    })

    const [disabledBtn,setDisabledBtn] = useImmer(false)

    const [passwordForm,setPasswordForm] = useImmer({
        currentPassword:'',
        newPassword: '',
        rewriteNewPassword:''
    })



    const [passwordError,setPasswordError] = useImmer('')

    const [profileError,setProfileError] = useImmer('')

    const [passwordSuccess, setPasswordSuccess] = useImmer(false)

    useEffect(() => {
        setProfileForm(draft => {
            draft.firstName = firstName || ''
            draft.lastName = lastName || '' 
        })
        setLastProfileForm(draft => {
            draft.firstName = firstName || ''
            draft.lastName = lastName || '' 
        })
    }, [firstName, lastName, setLastProfileForm, setProfileForm])

    const submitProfileForm = async(e:React.FormEvent) => {
        e.preventDefault()
        try{
            setProfileError('')
            setDisabledBtn(true)
            const response = await changeProfile(
                profileForm.firstName,
                profileForm.lastName,
                profileForm.currentPassword,
                token) as ProfileChange

            const userInfo = {
                firstName:response.firstName,
                lastName:response.lastName,
                currentPassword:''
            }
            
            setProfileForm(userInfo)
            setLastProfileForm(userInfo)
            setShowProfileForm(false)
        }catch(error){
            if (axios.isAxiosError(error))  {
                setProfileError(error.response?.data.Error)
                console.log(error)
              }
        }finally{
           
            setDisabledBtn(false)
        }
    }

    const cancelProfileChange = (e:React.FormEvent) => {
        e.preventDefault()
        setShowProfileForm(false)
        setProfileForm(lastProfileForm)
        setProfileError('')
    }

    const submitPasswordForm = async(e:React.FormEvent) => {
        try{
            e.preventDefault()
            setPasswordError('')
            setDisabledBtn(true)
            await changePassword(
                passwordForm.currentPassword,
                passwordForm.newPassword,
                passwordForm.rewriteNewPassword,
                token)
            setPasswordForm({
                currentPassword:'',
                newPassword: '',
                rewriteNewPassword:''
            })

            setPasswordSuccess(true)

            setTimeout(() => {
                setPasswordSuccess(false)
            },5000)

            
            
           
        }catch(error){
            if (axios.isAxiosError(error))  {
                setPasswordError(error.response?.data.Error)
              }
        }finally{
            setDisabledBtn(false)
        }
    }

    const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setProfileForm({
            ...profileForm,
            [name]: value,
        })
      }
    
    const handlePasswordChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const  {name,value} = e.target

        setPasswordForm({
            ...passwordForm,
            [name]:value
        })
    }

    return (
        <div className="profile-main-container">
            <h1>Profile</h1>
            <div className="profile-container">
                <div className="profile-details-container">
                    <h2>Profile Info</h2>
                    {showProfileForm ?
                    <form className='profile-info-container'onSubmit={submitProfileForm}>
                        <div className="profile-info">
                            <p>Email</p>
                            <p>{email}</p>
                        </div>
                        <div className="input-profile">
                            <label htmlFor="first-name-form">First Name<span>*</span></label>
                            <input onChange={handleProfileChange}
                            required={true}
                            value={profileForm.firstName}
                            name="firstName"
                            id="first-name-form"
                            type="text" />
                        </div>
                        <div className="input-profile">
                            <label htmlFor="last-name-form">Last Name<span>*</span></label>
                            <input value={profileForm.lastName}
                            required={true}
                            onChange={handleProfileChange}
                            id='last-name-form'
                            type="text"
                            name="lastName" />
                        </div>
                        <PasswordInput
                                setPassword={handleProfileChange} 
                                id={"password-profile"} 
                                value={profileForm.currentPassword} 
                                className={"input-profile"} 
                                name={"currentPassword"} 
                                inputName={"Current Password"} 
                                errors={profileError}/>
                        <div className="profile-form-btns">
                            <button disabled={disabledBtn} className="save-profile">Save</button>
                            <button disabled={disabledBtn} className="cancel-profile" onClick={cancelProfileChange}>Cancel</button>
                        </div>
                    </form>
                    :
                    <div className="profile-info-container">
                
                        <div className="profile-info">
                            <p>Email:</p>
                            <p>{email}</p>
                        </div>
                        <div className="profile-info">
                            <p>First Name</p>
                            <p>{profileForm.firstName}</p>
                        </div>
                        <div className="profile-info">
                            <p>Last Name</p>
                            <p>{profileForm.lastName}</p>
                        </div>
                        <button  className='change-profile' onClick={() => setShowProfileForm(true)}>Change Profile</button>
                    </div>}
                </div>
                <div className="password-form-container">
                    <h2>Password Change</h2>
                    <form onSubmit={submitPasswordForm}>
                        <PasswordInput
                            id={"current-password"}
                            value={passwordForm.currentPassword}
                            className={"password-input"}
                            name={"currentPassword"}
                            inputName={"Current Password"}
                            errors={''}
                            setPassword={handlePasswordChange}/>
                        <PasswordInput
                            id="new-password"
                            setPassword={handlePasswordChange}
                            value={passwordForm.newPassword}
                            className={"password-input"}
                            name={"newPassword"}
                            inputName={"New Password"}
                            errors={''}/>
                        <PasswordInput
                            setPassword={handlePasswordChange}
                            id={"confirm-new-password"}
                            value={passwordForm.rewriteNewPassword}
                            className={"password-input"}
                            name={"rewriteNewPassword"}
                            inputName={"Confirm New Password"}
                            errors={passwordError}/>
                        {
                            passwordSuccess ? 
                            <p className="success-message">Password Successfully Changed</p>
                            :
                            null
                        }
                        <button disabled={disabledBtn} className="change-password-btn">Change Password</button>
                        
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Profile