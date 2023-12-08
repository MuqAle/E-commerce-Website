import img1 from '../assets/imgs/front-page-imgs/anastasia-anastasia-cTM8psdeOTQ-low-.jpg'
import img2 from '../assets/imgs/front-page-imgs/jasmin-chew-WKD2vIe8Rb0-low.jpg'
import img3 from '../assets/imgs/front-page-imgs/j-lee-0lL6Sox7n1Y-unsplash.jpg'
import '../style/css/about-us.css'
import Breadcrumbs from '../components/breadcrumbs'



const AboutUs =() => {
    return (
        <div>
            <Breadcrumbs name={null}/>
            <h1 className='title'>About Us</h1>
            <div className="about-us-main-container">
                <div className="about-us-container our-story">
                    <div className="writing-container">
                        <h2>Our Story</h2>
                        <p>
                        Lorem ipsum dolor sit amet. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Convallis convallis tellus id interdum. Risus quis varius quam quisque id diam vel quam. Blandit aliquam etiam erat velit. Ut enim blandit volutpat maecenas volutpat blandit. 
                        Purus in mollis nunc sed id. Rhoncus urna neque viverra justo nec ultrices dui sapien eget.<br />
                        <span>Eiusmod Tempor Incididunt Ut Labore</span><br />
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut. Semper auctor neque vitae tempus quam pellentesque nec nam aliquam. Id interdum velit laoreet id donec ultrices. Luctus accumsan tortor posuere ac ut consequat. Viverra accumsan in nisl nisi scelerisque eu. Leo a diam sollicitudin tempor. Elit duis tristique sollicitudin nibh sit. Elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi tristique senectus. Cursus in hac habitasse platea dictumst quisque sagittis purus. Est ante in nibh mauris cursus mattis molestie a. Sagittis id consectetur purus ut faucibus pulvinar elementum. Tristique magna sit amet purus gravida. Sollicitudin ac orci phasellus egestas tellus.
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
                        <br /><span>Ut Eristique Et Egestas</span><br />
                        <span>Consequat Nisl Vel Pretium Lectus Quam Id</span>
                        <br /><span>Id Aliquet Risus Feugiat</span><br />
                        Imperdiet proin fermentum leo vel orci porta non pulvinar. Risus in hendrerit gravida rutrum quisque non tellus orci. Erat nam at lectus urna duis convallis convallis tellus id. Pharetra magna ac placerat vestibulum lectus mauris. Pretium lectus quam id leo in vitae turpis massa. Netus et malesuada fames ac turpis egestas maecenas pharetra. Adipiscing enim eu turpis egestas pretium aenean pharetra magna ac.
                        </p>
                    </div>
                </div>
                <div className="about-us-container sustain">
                    <div className="writing-container">
                        <h2>Sustainability</h2>
                        <p>
                            <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span> Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. <br />
                            <span>Fames ac turpis egestas maecenas pharetra convallis posuere morbi.</span> Aenean pharetra magna ac placerat vestibulum. Ullamcorper morbi tincidunt ornare massa. Adipiscing elit duis tristique sollicitudin nibh. Ipsum dolor sit amet consectetur. Sit amet nisl purus in mollis nunc sed. Pharetra magna ac placerat vestibulum lectus. Tempor nec feugiat nisl pretium fusce. Tincidunt nunc pulvinar sapien et ligula. Elit pellentesque habitant morbi tristique senectus et netus et malesuada. Quis enim lobortis scelerisque fermentum dui faucibus in ornare quam. Ultrices tincidunt arcu non sodales neque sodales ut etiam. Eu lobortis elementum nibh tellus molestie nunc non blandit massa. <br />
                            <span>Etiam tempor orci eu lobortis.</span> Sem nulla pharetra diam sit amet.Viverra nibh cras pulvinar mattis nunc sed. Sit amet volutpat consequat mauris nunc congue nisi vitae. Magna sit amet purus gravida quis blandit turpis. Dui faucibus in ornare quam. Nisi lacus sed viverra tellus. Curabitur vitae nunc sed velit dignissim sodales ut eu sem. Placerat vestibulum lectus mauris ultrices eros in cursus. Lorem ipsum dolor sit amet consectetur adipiscing elit ut.

                        </p>
                    </div>
                    <img src={img3} alt="cherry blossom" />
                </div>
            </div>
        </div>
    )
}

export default AboutUs