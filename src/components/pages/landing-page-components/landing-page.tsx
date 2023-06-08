import { Link } from "react-router-dom";
import CarouselComponent from "./carousel";
import ProductCarousel from "./product-carousel";
import '../../../style/css/landing-page.css'
import allData from "../../../assets/data/all-products";
import { useMemo } from "react";
import necklaceImg from '../../../assets/imgs/front-page-imgs/saeed-anahid--GhLgB-oXNw-unsplash.jpg'
import aboutUsImg from '../../../assets/imgs/front-page-imgs/harper-sunday-Vya9Ji2Eg6A-low.jpg'
import tripleImg1 from '../../../assets/imgs/front-page-imgs/natalie-sysko-0IOY1_3d-r0-low.jpg'
import tripleImg2 from '../../../assets/imgs/front-page-imgs/kateryna-hliznitsova-pjrPWwwYx1I-low.jpg'
import tripleImg3 from '../../../assets/imgs/front-page-imgs/cat-han-BJ3grTerqY4-unsplash.jpg'




interface Home{
  addToCart:(id:string) => void
  addFavorite:(id:string) => void
  favorited:(id:string) =>boolean
}

const Home = ({addToCart,addFavorite,favorited}:Home) => {
  const trending = useMemo(() => allData.slice(14,21),[])
  const whatsNew = useMemo(() => allData.slice(23,30),[])
  const onSale = useMemo(() => allData.filter(s => s.onSale === true).slice(0,7),[])

    return (
        <div className="landing-page-container">
          <CarouselComponent/>
          <ProductCarousel 
          array={trending} 
          addToCart={addToCart} 
          addFavorite={addFavorite} 
          favorited={favorited} 
          title='Trending'/>
          <Link className="home-img necklace" style={{ backgroundImage: `url(${necklaceImg})` }} to={"/necklace"}>
            <p className="words">Shop All Necklaces</p>
          </Link>
          <ProductCarousel
          array={whatsNew} 
          addToCart={addToCart} 
          addFavorite={addFavorite} 
          favorited={favorited} 
          title='Just In'/>
          <Link  to={'shop-all'} className="home-middle">
            <p className="words"> Shop The Collections </p>
            <div  style={{backgroundImage: `url(${tripleImg1})` }}>
              
            </div>
            <div style={{backgroundImage: `url(${tripleImg2})` }}>
            </div>
            <div style={{backgroundImage: `url(${tripleImg3})` }}>
            </div>
          </Link>
          <ProductCarousel
          array={onSale} 
          addToCart={addToCart} 
          addFavorite={addFavorite} 
          favorited={favorited} 
          title='On Sale'/>
          <Link className="home-img about-us" style={{ backgroundImage: `url(${aboutUsImg})` }} to={"/about-us"}>
            <p className="words">Learn More About Us</p>
          </Link>
        </div>
      );
}

export default Home