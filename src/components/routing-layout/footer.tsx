import Collapse from "./collapse-component";
import arrow from '../../assets/imgs/svg-imgs/arrow.svg'
import instagram from '../../assets/imgs/svg-imgs/icons8-instagram.svg'
import twitter from '../../assets/imgs/svg-imgs/icons8-twitter.svg'
import facebook from '../../assets/imgs/svg-imgs/icons8-facebook.svg'
import pintrest from '../../assets/imgs/svg-imgs/icons8-pinterest.svg'
import tiktok from '../../assets/imgs/svg-imgs/icons8-tiktok.svg'
import github from '../../assets/imgs/svg-imgs/icons8-github.svg'

const Footer = () => {

    return (
        <footer>
        <div className="website-footer-container">
            <div className="discount">
                <label className="email-signup-label" htmlFor="email-signup">SIGN UP FOR 10% OFF</label>
                <div className="input-box">
                    <input id="email-signup" placeholder="Enter your email address"></input>
                    <button type="submit"><img src={arrow} alt="arrow"/> </button>
                </div>
                <div className="checkbox-container">
                    <input type="checkbox" id='sign-up-checkbox'></input>
                    <label className="sign-up-checkbox-label" htmlFor="sign-up-checkbox">By signing up you agree to our <a>Privacy Policy</a></label>
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
                            <li><a>Sustainability</a></li>
                            <li><a>Offers</a></li>
                        </ul>
                </div>
                </div>
                <div id="info-mobile">
                <Collapse label={<h3>Help</h3>} className="info-links">
                        <ul>
                            <li><a>FAQs</a></li>
                            <li><a>Shipping</a></li>
                            <li><a>Returns</a></li>
                            <li><a>Materials and Care</a></li>
                            <li><a>Contact Us</a></li>
                        </ul>
                </Collapse>
                <Collapse label={<h3>About Us</h3>} className="info-links">
                        <ul>
                            <li><a>Rewards</a></li>
                            <li><a>Careers</a></li>
                            <li><a>Sustainability</a></li>
                            <li><a>Blog</a></li>
                        </ul>
                </Collapse>
                <Collapse label={<h3>More Info</h3>} className="info-links">
                        <ul>
                            <li><a>Terms and Conditions</a></li>
                            <li><a>Privacy Policy</a></li>
                            <li><a>Student Discount</a></li>
                            <li><a>Refer a Friend</a></li>
                            <li><a>Security</a></li>
                            <li><a>Sustainability</a></li>
                            <li><a>Offers</a></li>
                        </ul>
                </Collapse>
            </div>
        </div>
        <div className="credit">
            <a href="https://github.com/MuqAle" target="_blank" className="github">
                <p>Created By MuqAle</p>
                <img src={github} alt='github'/>
            </a>
            <ul className="socials">
                <a href=""><img src={instagram} alt="instagram" /></a>
                <a href=""><img src={tiktok} alt="tiktok" /></a>
                <a href=""><img src={twitter} alt="twitter" /></a>
                <a href=""><img src={facebook} alt="facebook" /></a>
                <a href=""><img src={pintrest} alt="pintrest" /></a>
            </ul>
        </div>
    </footer>
    )
}

export default Footer