import { Outlet, NavLink } from "react-router-dom";
import heartOutline from '../../assets/imgs/svg-imgs/heart-outline.svg'
import shoppingBag from '../../assets/imgs/svg-imgs/shopping-bag.svg'
import search from '../../assets/imgs/svg-imgs/search.svg'
import logo from '../../assets/imgs/svg-imgs/icons8-logo.svg'
import arrow from '../../assets/imgs/svg-imgs/arrow.svg'
import '../../style/css/root.css'

const RootLayout = () => {


    return(
        <div id="main-container">
            <header>
                <nav>
                    <NavLink id="logo" to={"/"}>
                            <img src={logo} alt="logo" />
                    </NavLink>
                    <div id="left-side-nav">
                        <NavLink to={"shop-all"}>Shop All</NavLink>
                        <NavLink to={"necklaces"}>Necklaces</NavLink>
                        <NavLink to={"bracelets"}>Bracelets</NavLink>
                        <NavLink to={"earrings"}>Earrings</NavLink>
                        <NavLink to={"on-sale"}>On Sale</NavLink>
                        <NavLink to={"about"}>About Us</NavLink>
                    </div>
                    <div id="right-side-nav">
                        <div className= 'search-bar'>
                            <button>
                                <img src={search} alt="search" />
                            </button>
                            <input type="text"></input>
                        </div>
                        
                        <NavLink id="whish-list" to={"wish-list"}>
                            <img src={heartOutline} alt="favorite-item"/>
                        </NavLink>
                        <NavLink id="shopping-cart" to={"shopping-cart"}>
                            <img src={shoppingBag} alt="add-to-cart"/>
                        </NavLink>
                    </div>
                </nav>
            </header>
            <main>
                <Outlet/>
            </main>
            <footer>
                <div className="discount">
                    <label htmlFor="email-signup">SIGN UP FOR 10% OFF</label>
                    <div className="input-box">
                        <input id="email-signup" placeholder="Enter your email address"></input>
                        <button type="submit"><img src={arrow} alt="arrow"/> </button>
                    </div>
                    <div>
                        <input type="checkbox" id='sign-up-checkbox'></input>
                        <label htmlFor="sign-up-checkbox">By signing up you agree to our <a>Privacy Policy</a></label>
                    </div>
                </div>
                <div id="info">
                    <div className="info-links">
                        <h3>Help</h3>
                            <ul>
                                <li><a>FAQs</a></li>
                                <li><a>Shipping</a></li>
                                <li><a>Returns</a></li>
                                <li><a>Materials and Care</a></li>
                                <li><a>Contact Us</a></li>
                            </ul>
                    </div>
                    <div className="info-links">
                        <h3>About Us</h3>
                            <ul>
                                <li><a>Rewards</a></li>
                                <li><a>Careers</a></li>
                                <li><a>Sustainability</a></li>
                                <li><a>Blog</a></li>
                            </ul>
                    </div>
                    <div className="info-links">
                        <h3>More Info</h3>
                            <ul>
                                <li><a>Terms and Conditions</a></li>
                                <li><a>Privacy Policy</a></li>
                                <li><a>Student Discount</a></li>
                                <li><a>Refer a Friend</a></li>
                                <li><a>Security</a></li>
                            </ul>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default RootLayout