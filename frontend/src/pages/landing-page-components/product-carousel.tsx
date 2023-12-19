import { scrollBack,scrollForward} from "../../utils/scroll-slider";
import { NavLink } from "react-router-dom";
import { useRef,useEffect,useState } from "react";
import forwardArrow from '../../assets/imgs/svg-imgs/arrow_forward_ios_FILL0_wght100_GRAD-25_opsz48.svg'
import backArrow from '../../assets/imgs/svg-imgs/arrow_back_ios_new_FILL0_wght100_GRAD0_opsz48.svg'
import disableBackArrow from '../../assets/imgs/svg-imgs/arrow-back-disabled.svg'
import disableforwardArrow from '../../assets/imgs/svg-imgs/arrow-forward-disabled.svg'
import Card from "../product-catalog/card";
import heartOutline from '../../assets/imgs/svg-imgs/heart-outline.svg'
import heartFilled from '../../assets/imgs/svg-imgs/heart-filled.svg'
import shoppingBag from '../../assets/imgs/svg-imgs/shopping-bag-white.svg'
import { LandingTypes } from "../../utils/types";
import EmptyCard from "../../components/empty-card";




const ProductCarousel = ({data,addToCart,addFavorite,favorited,title,isLoading}:LandingTypes) => {

    const scroll = useRef<HTMLDivElement>(null);
    const [isScrollAtStart, setIsScrollAtStart] = useState(true);
    const [isScrollAtEnd, setIsScrollAtEnd] = useState(false);

    useEffect(() => {
      const scrollElement = scroll.current;
        const handleScroll = () => {
            
            if (scrollElement) {
              const atStart = scrollElement.scrollLeft === 0;
              const atEnd =
                scrollElement.scrollLeft + scrollElement.clientWidth >=
                scrollElement.scrollWidth;
          
              setIsScrollAtStart(atStart);
              setIsScrollAtEnd(atEnd);
            }
          };
        scrollElement?.addEventListener("scroll", handleScroll);

        return () => {
            
            scrollElement?.removeEventListener("scroll", handleScroll);
          };
       
    },[])


    return(
        <div className="display-container">
              <div className="header-display-container">
                <h1 className="container-heading">{title}</h1>
                <div className="display-container-btns">
                    <button disabled = {isScrollAtStart} onClick={() => scrollBack(scroll)}
                    className="product-carousel-back"><img src={isScrollAtStart ? disableBackArrow:backArrow} alt="back-arrow" /></button>
                    <button disabled = {isScrollAtEnd} onClick={() => scrollForward(scroll)} className="product-carousel-forward"><img src={isScrollAtEnd ? disableforwardArrow : forwardArrow} alt="forward-arrow" /></button>
                </div>
              </div>
              <div className="landing-page-card-container" ref={scroll}>
                {isLoading ? 
                [...Array(7)].map((_card,i) => {
                  return(
                    <div className="landing-page-card" key={i}>
                      <EmptyCard/>
                    </div>
                    
                  )
                })
                :
                data.map(a => (
                  <div className='landing-page-card'  key={a._id}>
                    <NavLink className="product-link" to={`${a.type}/${a._id}`} >
                      <Card cardInfo={a}></Card>
                    </NavLink>
                    <button className="landing-page-left-btn" 
                    style = {favorited(a._id) ? {visibility:"visible", opacity:'100%'} : {visibility:'hidden', opacity:'0'}}
                    onClick={()=> addFavorite(a._id)} ><img src={favorited(a._id) ? heartFilled:heartOutline} alt="add-favorite" /></button>
                    {
                        a.stock === 0 ? 
                        <span className="out-of-stock">
                            Out of Stock
                        </span>
                        :
                        <button className="right-btn" onClick={() => {addToCart(a._id)}}><img src={shoppingBag} alt='add-to-cart'></img></button>
                    }
                  </div>
                ))}
              </div>
            </div>
    )
}

export default ProductCarousel