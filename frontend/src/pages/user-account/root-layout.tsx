import { Outlet } from "react-router"
import {  NavLink } from "react-router-dom"
import { v4 as uuidv4 } from 'uuid'
import '../../style/css/orders.css'
import '../../style/css/profile-layout.css'
import '../../style/css/user-profile-reviews.css'
import { RefObject, useEffect } from "react"
import arrow from '../../assets/imgs/svg-imgs/arrow_forward_ios_FILL0_wght100_GRAD-25_opsz48.svg'
import { useImmer } from "use-immer"
import { useLocation } from "react-router"
import useOutsideClick from "../../hooks/outside-click"



const UserLayout = () => {

    const [selectedLocation, setSelectedLocation] = useImmer('Profile')
    const [dropDown,setDropDown] = useImmer(false)
    const locationReact = useLocation()

    useEffect(() => {
        const controller = new AbortController()
        const user = localStorage.getItem('loggedUser') || sessionStorage.getItem('loggedUser')
        if(!user){
            location.replace('/login')
        }

        return () => {
            controller.abort()
        }
    },[])

    useEffect(() => {
        const pathParam = locationReact.pathname.split('/')[locationReact.pathname.split('/').length - 1]
        const locationSelected = pathParam[0].toUpperCase() + pathParam.slice(1)
        setSelectedLocation(locationSelected)
    },[locationReact.pathname, setSelectedLocation])

    const handleOutsideClick = () => {
        setDropDown(false)
      }

    const ref = useOutsideClick(handleOutsideClick) as RefObject<HTMLDivElement>


    const signOut = () => {
        window.localStorage.removeItem('loggedUser')
        window.sessionStorage.removeItem('loggedUser')
        location.reload()
    }


    if(localStorage.getItem('loggedUser') || sessionStorage.getItem('loggedUser')){
        return(
            <div className="user-container">
            <div className="user-nav-mobile ">
                <div  ref={ref} className={dropDown ? "user-nav-drop-down active" : "user-nav-drop-down"}>
                    <button  className="dropdown-toggle-btn" onClick={() => setDropDown(!dropDown)}>{selectedLocation}
                        <img src={arrow}/>
                    </button>
                    <div style={dropDown ? {maxHeight: '1000px',transition: 'max-height 1.3s ease-in-out '}:{maxHeight:'0'}}>
                        <li className='user-nav-mobile-container' onClick={handleOutsideClick} key={uuidv4()}>
                            <NavLink className='user-nav-mobile' to='profile'>Profile</NavLink>
                        </li>
                        <li className='user-nav-mobile-container' onClick={handleOutsideClick} key={uuidv4()}>
                            <NavLink className='user-nav-mobile' to='orders'>Orders</NavLink>
                        </li>
                        <li className='user-nav-mobile-container' onClick={handleOutsideClick} key={uuidv4()}>
                            <NavLink className='user-nav-mobile' to='reviews'>Reviews</NavLink>
                        </li>
                    </div>
                </div>
                <button onClick={signOut} className="sign-out-mobile-btn">Sign Out</button>
            </div>
            <ul className="user-nav">
                <li key={uuidv4()}>
                    <NavLink className='user-nav-link' to='profile'>Profile</NavLink>
                </li>
                <li key={uuidv4()}>
                    <NavLink className='user-nav-link' to="orders">Orders</NavLink>
                </li >
                <li key={uuidv4()}>
                    <NavLink className='user-nav-link' to="reviews">Reviews</NavLink>
                </li>
                <li key={uuidv4()}>
                    <button onClick={signOut}>
                        Sign Out
                    </button>
                </li>
            </ul>
            <div className="user-main">
                <Outlet/>
            </div>
        </div>
        )
    }else{
        return(
            <div className="empty" style={{height:'100vh'}}>

            </div>
        ) 
    }
   

}

export default UserLayout