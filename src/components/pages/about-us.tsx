import img1 from '../../assets/imgs/front-page-imgs/anastasia-anastasia-cTM8psdeOTQ-low-.jpg'
import img2 from '../../assets/imgs/front-page-imgs/jasmin-chew-WKD2vIe8Rb0-low.jpg'
import img3 from '../../assets/imgs/front-page-imgs/masaaki-komori-NoXUQ54pDac-unsplash.jpg'
import '../../style/css/about-us.css'



const AboutUs =() => {
    return (
        <div>
            <h1 className='title'>About Us</h1>
            <div className="about-us-main-container">
                <div className="about-us-container our-story">
                    <div className="writing-container">
                        <h2>Our Story</h2>
                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Convallis convallis tellus id interdum. Risus quis varius quam quisque id diam vel quam. Blandit aliquam etiam erat velit. Ut enim blandit volutpat maecenas volutpat blandit. Purus in mollis nunc sed id. Rhoncus urna neque viverra justo nec ultrices dui sapien eget.
                
                        </p>
                    </div>
                    <img src={img1} alt="girl wearing necklace" />
                </div>
                <div className='about-us-container mission'>
                    <img src={img2} alt="A book and mirror with 2 circular gold earrings on top " />
                    <div className="writing-container">
                        <h2>Our Mission</h2>
                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                    </div>
                </div>
                <div className="about-us-container sustain">
                    <div className="writing-container">
                        <h2>Sustainability</h2>
                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                    </div>
                    <img src={img3} alt="cherry blossom" />
                </div>
            </div>
        </div>
    )
}

export default AboutUs