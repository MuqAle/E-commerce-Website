import { scrollBack,scrollForward} from "../../utils/scroll-slider";
import allData from "../../assets/data/all-products";
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


interface ProductCarouselProps{
    array:typeof allData,
    addToCart:(id:string) => void,
    addFavorite:(id:string) => void,
    favorited:(id:string) =>boolean,
    title:string
}

const ProductCarousel = ({array,addToCart,addFavorite,favorited,title}:ProductCarouselProps) => {

    const scroll = useRef<HTMLDivElement>(null);
    const [isScrollAtStart, setIsScrollAtStart] = useState(true);
    const [isScrollAtEnd, setIsScrollAtEnd] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollElement = scroll.current;
          
            if (scrollElement) {
              const atStart = scrollElement.scrollLeft === 0;
              const atEnd =
                scrollElement.scrollLeft + scrollElement.clientWidth >=
                scrollElement.scrollWidth;
          
              setIsScrollAtStart(atStart);
              setIsScrollAtEnd(atEnd);
            }
          };
        scroll.current?.addEventListener("scroll", handleScroll);

        return () => {
            scroll.current?.removeEventListener("scroll", handleScroll);
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
                {array.map(a => (
                  <div className='landing-page-card'  key={a.id}>
                    <NavLink className="product-link" to={`${a.type}/${a.id}`} >
                      <Card cardInfo={a}></Card>
                    </NavLink>
                    <button className="landing-page-left-btn" onClick={()=> addFavorite(a.id)} ><img src={favorited(a.id) ? heartFilled:heartOutline} alt="add-favorite" /></button>
                    <button className="landing-page-right-btn" onClick={() => addToCart(a.id)}><img src={shoppingBag} alt='add-to-cart'></img></button>
                  </div>
                ))}
              </div>
            </div>
    )
}

export default ProductCarousel