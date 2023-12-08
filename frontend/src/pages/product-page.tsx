import { useEffect,  useRef} from "react"
import { useParams} from "react-router-dom"
import { ProductDb, ProductTypes, UserReviewType } from "../utils/types"
import '../style/css/product-page.css'
import '../style/css/pagination.css'
import ReactImageMagnify from "@blacklab/react-image-magnify"
import heartImg from '../assets/imgs/svg-imgs/heart-outline.svg'
import filledHeart from '../assets/imgs/svg-imgs/heart-filled.svg'
import rightArrow from '../assets/imgs/svg-imgs/arrow_forward_ios_FILL0_wght100_GRAD-25_opsz48.svg'
import leftArrow from '../assets/imgs/svg-imgs/arrow_back_ios_new_FILL0_wght100_GRAD0_opsz48.svg'
import Breadcrumbs from "../components/breadcrumbs"
import { getOneProduct } from "../services/products"
import { useImmer } from "use-immer"
import StarRating from "./reviews-components/star-rating"
import ReviewsSection from "./reviews-components/reviews"
import { AnimatePresence } from "framer-motion"
import ReviewForm from "./reviews-components/review-form"
import disableScrollModal from "../utils/stop-scrolling"




interface Params {
    id: string;
}


const ProductPage = ({addToCart,addFavorite,favorited,loginFnc,user,userReviews}:ProductTypes) => {
    
    const {id} = useParams<keyof Params>() as Params
    const [image, setImage] = useImmer(0)
    const [product, setProduct] = useImmer<ProductDb>(Object)
    const [reviews,setReviews] = useImmer(product.reviews)
    const [showReviewModal,setShowReviewModal] = useImmer(false)
    const [rating,setRating] = useImmer<null | number>(null)
    const ref = useRef<HTMLDivElement>(null)
    const [foundReview,setFoundReview] = useImmer<UserReviewType['reviews']>(undefined)

    useEffect (() => {
        if(userReviews){
            const review = userReviews.find(reviews => reviews.product._id === id)
            if(review){
                const foundReview = {
                    reviewDesc : review?.reviewDesc as string,
                    reviewTitle: review?.reviewTitle as string,
                    rating: review?.rating as number 
                }
                setFoundReview(foundReview)
            }
        }
    },[id, setFoundReview, userReviews])
 

    useEffect(() => {
        const controller = new AbortController()
        getOneProduct(id).then(product => {
            setProduct(product)
            setReviews(product.reviews)
        })

        return () => {
            controller.abort()
          }
    },[id, setProduct, setReviews])

    useEffect(() => {
        disableScrollModal(showReviewModal)
    },[showReviewModal])

    const scrollToReviews = () => {
        if (ref.current) {
            ref.current.scrollIntoView({
                behavior: 'smooth',
                block:'start',
                inline: 'center'
            })
        }
    }

    const increment = () => {
        if(product && product.images && image+1 === product.images.length){
            setImage(0)
        }
        else{
            setImage(i => i + 1)
        }
    }

    const decrement = () => {
        if(product && product.images && image-1 === -1){
            setImage(1)
        }
        else{
            setImage(i => i - 1)
        }
    }
    if(product && product.images){
    return(
        <div className="product-page-container">
            <AnimatePresence>
              {
                showReviewModal &&
                <ReviewForm 
                setFoundReview = {setFoundReview}
                foundReview={foundReview}
                setReviews={setReviews}
                setRating = {setRating} 
                closeModal={() => setShowReviewModal(false)}  
                rating={rating}
                product={id}
                user={user}
                />
              }
            </AnimatePresence>
            <Breadcrumbs name={product.name}/>
            <div className="product-page">
                <div className="product-images">
                    <div className="gallery">
                        {product.images.map((i,index) =>
                        <button key={index} className="image-button" onClick={() => setImage(index)}><img  src={i} alt="image-button"/></button>)}
                    </div>
                    <div className="product-img-container">
                        <ReactImageMagnify className = 'product-img'
                        
                        imageProps={{
                            src: product.images[image],
                        }}
                        magnifiedImageProps={{
                            src:product.images[image],
                            height:1300,
                            width:1300
                        }}
                        magnifyContainerProps={{
                            className:'magnify-container',
                            height:500,
                            width:500
                        }}
                        portalProps={{
                            horizontalOffset:10,
                            verticalOffset:10
                            
                        }}
                        activationInteractionHint="hover"/>
                        {product.images.length > 1 ? <button className="left-count-btn" onClick={decrement}><img src={leftArrow} alt="" /></button> : null}
                        {product.images.length > 1 ? <button className="right-count-btn" onClick={increment}><img src={rightArrow} alt="" /></button> : null}
                    </div>
                    </div>
                    <div className="product-info">
                        <div className="first-container">
                            <h1 className="product-name">{product.name}</h1>
                            <button className = 'add-product-favorites' onClick={() => {if(product?._id !== undefined){addFavorite(product._id)}
                            }}><img src={favorited(product._id) ? filledHeart : heartImg}  alt="favorite-btn" /></button>
                        </div>
                        {
                            product.overallRating > 0 ? 
                            <div className="product-rating-top-page">
                                <StarRating rating={product.overallRating} size="24" type="product"/>
                                <button onClick={scrollToReviews}>{product.reviews?.length} Reviews</button>
                            </div>
                            :
                            null
                        }
                        {product?.onSale ?
                        <p className='product-price product-sale-price'>${product.salePrice?.toFixed(2)} <s>${product?.price.toFixed(2)}</s> </p>
                        :
                        <p className='product-price '>${product.price}</p>}
                        <button className={product.stock === 0 ? 'add-to-bag sold-out' : "add-to-bag"} disabled ={product.stock === 0 ? true : false} 
                        onClick={()=> {if(product._id !== undefined){addToCart(product._id)}}}>
                            {product.stock === 0 ? 'Out of Stock' : 'Add to Bag'}
                            </button>
                        <p>Description :<br/><br/>{product.description}</p>
                    </div>
                    
            </div>
            <ReviewsSection 
            setStarRating={setRating}
            rating={rating}
            openModal={() => user ? setShowReviewModal(true) : setShowReviewModal(false)} 
            loginFnc={loginFnc} ref={ref} 
            reviews={reviews} 
            overallRating={product.overallRating}/>
        </div>
    )}else{
        return (
           <div className="empty-page">
           </div>
         )
    }
}

export default ProductPage