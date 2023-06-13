import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import img1 from '../../assets/imgs/front-page-imgs/andie-gomez-acebo-sEq4onJnWrI-low.jpg'
import img2 from '../../assets/imgs/front-page-imgs/gio-bartlett-tS7vQ6apZaM-unsplash.jpg'
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
                <p className="fall words">Just In: New Fall Collection</p>
                <img src={img2} alt="woman with two necllaces on" loading="lazy"/>
            </div>
            <div>
                <p className="summer words">Shop Summer Collection</p>
                <img src={img1} alt="woman with a big necklace" loading="lazy"/>
            </div>
            
        </Carousel>
    )
}

export default CarouselComponent