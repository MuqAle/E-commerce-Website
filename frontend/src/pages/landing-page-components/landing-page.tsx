import { Link } from "react-router-dom";
import CarouselComponent from "./carousel";
import ProductCarousel from "./product-carousel";
import '../../style/css/landing-page.css'
import necklaceImg from '../../assets/imgs/front-page-imgs/saeed-anahid--GhLgB-oXNw-unsplash.jpg'
import aboutUsImg from '../../assets/imgs/front-page-imgs/harper-sunday-Vya9Ji2Eg6A-low.jpg'
import tripleImg1 from '../../assets/imgs/front-page-imgs/natalie-sysko-0IOY1_3d-r0-low.jpg'
import tripleImg2 from '../../assets/imgs/front-page-imgs/kateryna-hliznitsova-pjrPWwwYx1I-unsplash.jpg'
import tripleImg3 from '../../assets/imgs/front-page-imgs/cat-han-BJ3grTerqY4-unsplash.jpg'
import { FunctionTypes, ProductDb} from "../../utils/types"
import { useEffect } from "react";
import { getFrontPageProducts } from "../../services/products";
import { useImmer } from "use-immer";

interface FrontPageData{
  newProducts:ProductDb[],
  onSaleProducts:ProductDb[],
  trendingProducts:ProductDb[]
}


const Home = ({addToCart,addFavorite,favorited}:FunctionTypes) => {

  const [products,setProducts] = useImmer<FrontPageData>(Object)
  const [isLoading,setIsLoading] = useImmer(true)

  useEffect(() => {
    const controller = new AbortController()
    getFrontPageProducts().then(products => {
      setProducts(products)
    }).catch(err => {
      console.log(err)
    }).finally(() => {
      setIsLoading(false)
    })

    return () => {
      controller.abort()
    }
  })

    return (
        <div className="landing-page-container">
          <CarouselComponent/>
          <ProductCarousel 
          isLoading={isLoading}
          data={products.trendingProducts} 
          addToCart={addToCart} 
          addFavorite={addFavorite} 
          favorited={favorited} 
          title='Trending'/>
          <Link className="home-img necklace" style={{ backgroundImage: `url(${necklaceImg})` }} to={"/necklace"}>
            <p className="words">Shop All Necklaces</p>
          </Link>
          <ProductCarousel
          isLoading={isLoading}
          data={products.newProducts} 
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
          isLoading={isLoading}
          data={products.onSaleProducts} 
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