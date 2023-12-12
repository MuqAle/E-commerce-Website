import { Outlet } from "react-router";
import {  NavLink } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid'
import '../../style/css/orders.css'
import '../../style/css/profile-layout.css'
import '../../style/css/user-profile-reviews.css'
import { useEffect } from "react";


const UserLayout = () => {

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

    return(
        <div className="user-container">
        <ul className="user-nav">
            <li key={uuidv4()}>
                <NavLink className='user-nav-link' to='profile'>Profile</NavLink>
            </li>
            <li key={uuidv4()}>
                <NavLink className='user-nav-link' to="orders">Orders</NavLink>
            </li >
            <li key={uuidv4()}>
                <NavLink className='user-nav-link' to="reviews-posted">Reviews</NavLink>
            </li>
            <li key={uuidv4()}>
                <button>
                    Sign Out
                </button>
            </li>
        </ul>
        <div className="user-main">
            <Outlet/>
        </div>
    </div>
    )

}

export default UserLayout