import { NavLink } from 'react-router-dom'
import { useState,useEffect} from "react";
import heartOutline from '../../assets/imgs/svg-imgs/heart-outline.svg'
import shoppingBag from '../../assets/imgs/svg-imgs/shopping-bag.svg'
import search from '../../assets/imgs/svg-imgs/search.svg'
import logo from '../../assets/imgs/svg-imgs/icons8-logo.svg'
import menu from '../../assets/imgs/svg-imgs/menu_FILL0_wght100_GRAD0_opsz48.svg'
import close from '../../assets/imgs/svg-imgs/close_FILL0_wght100_GRAD0_opsz48.svg'
import arrow from '../../assets/imgs/svg-imgs/arrow.svg'

interface Header{
    shoppingCart:number,
    favorites:number
}

const Header = ({favorites, shoppingCart}:Header) => {

    const [openMenu,setOpenMenu] = useState(false)
    const [openSearch, setOpenSearch] = useState(false)

    const toggleMenu = () => {
        setOpenMenu((menu) => !menu )
    }

    const toggleSearch = () => {
        setOpenSearch(search => !search)
    }

    useEffect(() => {
    const body = document.querySelector("body")
      const root = document.querySelector<HTMLElement>('#main-container');
      if(body && root){
          body.style.overflow = openMenu ? 'hidden' : 'visible';
          root.style.overflow = openMenu ? 'hidden' : 'visible';
      }
      }, [openMenu])

    useEffect(() => {
        const search = document.querySelector<HTMLInputElement>('.input-search')
        if(search){
            search.focus()
        }
    },[openSearch])
      return(
        <header>
        <nav>
            <NavLink id="logo" to={"/"}>
                    <img src={logo} alt="logo" />
            </NavLink>
            <div id="left-side-nav">
                <NavLink className = 'header-link' to={"shop-all"}>Shop All</NavLink>
                <NavLink className = 'header-link' to={"necklace"}>Necklaces</NavLink>
                <NavLink className = 'header-link' to={"bracelet"}>Bracelets</NavLink>
                <NavLink className = 'header-link' to={"earrings"}>Earrings</NavLink>
                <NavLink className = 'header-link' to={"on-sale"}>On Sale</NavLink>
                <NavLink className = 'header-link' to={"about-us"}>About Us</NavLink>
            </div>
            <div className="nav-bar-container" style={openMenu ? {background:'rgba(0, 0, 0, 0.6)' } : {background:'transparent',visibility:'hidden'}}>
                <div id="left-side-nav-mobile" style={openMenu ? {width:'100%'} : {width:'0px'}}>
                     <button className="close-menu" onClick={toggleMenu}><img src={close} alt="close menu" /></button>
                    <NavLink className = 'header-link' to={"shop-all"} onClick={toggleMenu}>Shop All</NavLink>
                    <NavLink className = 'header-link' to={"necklace"} onClick={toggleMenu}>Necklaces</NavLink>
                    <NavLink className = 'header-link' to={"bracelet"} onClick={toggleMenu}>Bracelets</NavLink>
                    <NavLink className = 'header-link' to={"earrings"} onClick={toggleMenu}>Earrings</NavLink>
                    <NavLink className = 'header-link' to={"on-sale"} onClick={toggleMenu}>On Sale</NavLink>
                    <NavLink className = 'header-link' to={"about-us"} onClick={toggleMenu}>About Us</NavLink>
                </div>
            </div>
            <div id="right-side-nav">
                <button onClick={toggleSearch} className="btn-search">
                    <img src={search} alt="search" />
                </button>
                <NavLink id="wish-list" to={"wish-list"}>
                    {favorites === 0? null:<span className="favorite-span">{favorites}</span>}
                    <img src={heartOutline} alt="favorite-item"/>
                </NavLink>
                <NavLink id="shopping-cart" to={"shopping-cart"}>
                    {shoppingCart === 0?null:<span className="shopping-cart-span">{shoppingCart}</span>}
                    <img src={shoppingBag} alt="add-to-cart"/>
                </NavLink>
                <button className="menu" onClick={toggleMenu}><img src={menu} alt="open menu" /></button>
            </div>
        </nav>
        <div className="input-container" style={openSearch ? {height:'80px'} : {height:'0px',padding:0}}>
            <div className="search-container">
                <input className="input-search" type="text"></input>
                <button className="search-submit"><img src={arrow}/></button>
            </div>
        </div>
    </header>
    )
}

export default Header