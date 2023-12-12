import { NavLink } from 'react-router-dom'
import { useState,useEffect,useRef, RefObject} from "react";
import heartOutline from '../../assets/imgs/svg-imgs/heart-outline.svg'
import shoppingBag from '../../assets/imgs/svg-imgs/shopping-bag.svg'
import searchImg from '../../assets/imgs/svg-imgs/search.svg'
import logo from '../../assets/imgs/svg-imgs/icons8-logo.svg'
import menu from '../../assets/imgs/svg-imgs/menu_FILL0_wght100_GRAD0_opsz48.svg'
import close from '../../assets/imgs/svg-imgs/close_FILL0_wght100_GRAD0_opsz48.svg'
import arrow from '../../assets/imgs/svg-imgs/arrow.svg'
import user from '../../assets/imgs/svg-imgs/account_circle_FILL0_wght200_GRAD0_opsz48.svg'
import { LoginTypes, ProductDb } from '../../utils/types';
import disableScrollModal from '../../utils/stop-scrolling';
import useOutsideClick from '../../hooks/outside-click';
import { useImmer } from 'use-immer';
import { useNavigate } from 'react-router-dom';
import AddedToCartMsg from './add-to-cart-msg';

interface Header{
    shoppingCart:number,
    favorites:number,
    logInModal:boolean,
    loggedUser:LoginTypes | null
    setLoginModal : React.Dispatch<React.SetStateAction<boolean>>
    productAddedToCart:ProductDb
    showCartMsg:boolean
}

const Header = ({favorites, shoppingCart,logInModal,setLoginModal,loggedUser,productAddedToCart,showCartMsg}:Header) => {

    const [openMenu,setOpenMenu] = useState(false)
    const [openSearch, setOpenSearch] = useState(false)
    const [search,setSearch] = useImmer('')
    const searchRef = useRef<HTMLInputElement>(null)
    const navigate = useNavigate()


    const toggleMenu = () => {
        setOpenMenu((menu) => !menu )
        
    }

    const loginModal = (e : React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        if(!logInModal && !loggedUser){
            e.preventDefault()
            setLoginModal(true)
        }else{
            return
        }
    }

    const toggleSearch = () => {
        setOpenSearch(isOpen => !isOpen)
        !openSearch ?  searchRef.current?.focus() : searchRef.current?.blur()
    }

    const closeSearch = () => {
        setOpenSearch(false)
    }


    useEffect(() => {
        disableScrollModal(openMenu)
      }, [openMenu])

    const outSideSearch = useOutsideClick(closeSearch) 


      return(
        <header>
        <nav>
            <NavLink id="logo" to={"/"}>
                    <img src={logo} alt="logo" />
            </NavLink>
            <div id="left-side-nav">
                <NavLink reloadDocument={true} className = 'header-link' to={"shop-all"}>Shop All</NavLink>
                <NavLink reloadDocument={true} className = 'header-link' to={"necklace"}>Necklaces</NavLink>
                <NavLink reloadDocument={true} className = 'header-link' to={"bracelet"}>Bracelets</NavLink>
                <NavLink reloadDocument={true} className = 'header-link' to={"earrings"}>Earrings</NavLink>
                <NavLink reloadDocument={true} className = 'header-link' to={"on-sale"}>On Sale</NavLink>
                <NavLink className = 'header-link' to={"about-us"}>About Us</NavLink>
            </div>
            <div className="nav-bar-container" style={openMenu ? {background:'rgba(0, 0, 0, 0.6)' } : {background:'transparent',visibility:'hidden'}}>
                <div id="left-side-nav-mobile" style={openMenu ? {width:'100%'} : {width:'0px'}}>
                     <button className="close-menu" onClick={toggleMenu}><img src={close} alt="close menu" /></button>
                    <NavLink reloadDocument={true} className = 'header-link' to={"shop-all"} onClick={toggleMenu}>Shop All</NavLink>
                    <NavLink reloadDocument={true} className = 'header-link' to={"necklace"} onClick={toggleMenu}>Necklaces</NavLink>
                    <NavLink reloadDocument={true} className = 'header-link' to={"bracelet"} onClick={toggleMenu}>Bracelets</NavLink>
                    <NavLink reloadDocument={true} className = 'header-link' to={"earrings"} onClick={toggleMenu}>Earrings</NavLink>
                    <NavLink reloadDocument={true} className = 'header-link' to={"on-sale"} onClick={toggleMenu}>On Sale</NavLink>
                    <NavLink className = 'header-link' to={"about-us"} onClick={toggleMenu}>About Us</NavLink>
                </div>
            </div>
            <div id="right-side-nav">
                <div>

                </div>
                <NavLink reloadDocument={true} id='user-account' onClick={loginModal}  to={'user-account/profile'}>
                    <img src={user} alt='user settings'/>
                </NavLink>
                <button onClick={toggleSearch} className="btn-search">
                    <img src={searchImg} alt="search" />
                </button>
                <NavLink id="wish-list" to={"wish-list"}>
                    {favorites === 0? null:<span className="favorite-span">{favorites}</span>}
                    <img src={heartOutline} alt="favorite items"/>
                </NavLink>
                <NavLink id="shopping-cart" to={"shopping-cart"}>
                    {shoppingCart === 0?null:<span className="shopping-cart-span">{shoppingCart}</span>}
                    <img src={shoppingBag} alt="add to cart"/>
                </NavLink>
                <button className="menu" onClick={toggleMenu}><img src={menu} alt="open menu" /></button>
            </div>
        </nav>
        <div className="input-container" style={openSearch ? {height:'80px'} : {height:'0px',padding:0}}>
            <form className="search-container" ref={outSideSearch as RefObject<HTMLFormElement>}>
                <input className="input-search" value={search} onChange={(e) => setSearch(e.target.value)} id='input-search-bar'  ref={searchRef} type="text" ></input>
                    <button className="search-submit" onClick={(e) => {
                        e.preventDefault()
                        if(search === ''){
                            return 
                        }else{
                            window.sessionStorage.setItem('searchItem',search)
                            navigate('search')
                            navigate(0)
                           setSearch('')
                        }
                        }}><img src={arrow}/></button>
            </form>
        </div>
        {showCartMsg ?
            <AddedToCartMsg product={productAddedToCart} shopping={shoppingCart}/>
            :
            null}
    </header>
    )
}

export default Header