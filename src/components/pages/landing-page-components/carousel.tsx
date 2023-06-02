import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import img1 from '../../../assets/imgs/front-page-imgs/anastasia-anastasia-cTM8psdeOTQ-low-.jpg'
import img2 from '../../../assets/imgs/front-page-imgs/andie-gomez-acebo-sEq4onJnWrI-low.jpg'
import img3 from '../../../assets/imgs/front-page-imgs/harper-sunday-Vya9Ji2Eg6A-low.jpg'
import img4 from '../../../assets/imgs/front-page-imgs/jasmin-chew-WKD2vIe8Rb0-low.jpg'
import {Carousel} from "react-responsive-carousel";


const CarouselComponent = () => {
    return (
        <Carousel 
            autoPlay = {true}
            showThumbs = {false}
            useKeyboardArrows={true}
            showStatus={false}
            stopOnHover={true}
            swipeable={true}
            showIndicators={false}
            dynamicHeight={false}
            interval={5000}
            infiniteLoop={true}>
            <div>
                <img src={img1} alt="" />
            </div>
            <img src={img2} alt="" />
            <img src={img3} alt="" />
            <img src={img4} alt="" />
        </Carousel>
    )
}

export default CarouselComponent