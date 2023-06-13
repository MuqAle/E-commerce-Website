import { useState } from "react"
import { useParams} from "react-router-dom"
import ErrorPage from "./error-page"
import '../style/css/product-page.css'
import ReactImageMagnify from "@blacklab/react-image-magnify"
import heartimg from '../assets/imgs/svg-imgs/heart-outline.svg'
import filledheart from '../assets/imgs/svg-imgs/heart-filled.svg'
import rightArrow from '../assets/imgs/svg-imgs/arrow_forward_ios_FILL0_wght100_GRAD-25_opsz48.svg'
import leftArrow from '../assets/imgs/svg-imgs/arrow_back_ios_new_FILL0_wght100_GRAD0_opsz48.svg'
import Breadcrumbs from "../components/breadcrumbs"


interface ProductProp{
    data:{
        name:string,
        id:string,
        type:string,
        price:number,
        onSale:boolean,
        salePrice:number,
        description:string,
       Gallery:string[],
    }[],
    addToCart: (id:string) => void,
    addToFavorite: (id:string) => void,
    favorited: (id:string | undefined) => boolean 
}

interface Params {
    id: string;
}


const ProductPage = ({data,addToCart,addToFavorite,favorited}:ProductProp) => {
    
    const {id} = useParams<keyof Params>() as Params
    const [image, setImage] = useState(0)
    const product= data.find(p => p.id === id);
    if(!product){
        return (
           <ErrorPage/>
        )
    }
    
    const increment = () => {
        if(product && product.Gallery && image+1 === product.Gallery.length){
            setImage(0)
        }
        else{
            setImage(i => i + 1)
        }
    }

    const decrement = () => {
        if(product && product.Gallery && image-1 === -1){
            setImage(1)
        }
        else{
            setImage(i => i - 1)
        }
    }

    return(
        <div className="product-page-container">
            <Breadcrumbs/>
            <div className="product-page">
                <div className="product-images">
                    <div className="gallery">
                        {product?.Gallery.map((i,index) =>
                        <button key={index} className="image-button" onClick={() => setImage(index)}><img  src={i} alt="image-button"/></button>)}
                    </div>
                    <div className="product-img-container">
                        <ReactImageMagnify className = 'product-img'
                        
                        imageProps={{
                            src: product?.Gallery[image],
                        }}
                        magnifiedImageProps={{
                            src:product?.Gallery[image],
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
                        {product && product.Gallery && product.Gallery.length > 1 ? <button className="left-count-btn" onClick={decrement}><img src={leftArrow} alt="" /></button> : null}
                        {product && product.Gallery && product.Gallery.length > 1 ? <button className="right-count-btn" onClick={increment}><img src={rightArrow} alt="" /></button> : null}
                    </div>
                    </div>
                    <div className="product-info">
                        <div className="first-container">
                            <h1 className="product-name">{product?.name}</h1>
                            <button className = 'add-product-favorites' onClick={() => {if(product?.id !== undefined){addToFavorite(product.id)}
                            }}><img src={favorited(product?.id) ? filledheart : heartimg } alt="favorite-btn" /></button>
                        </div>
                        {product?.onSale ?
                        <p className='product-price product-sale-price'>${product?.salePrice.toFixed(2)} <s>${product?.price}</s> </p>
                        :
                        <p className='product-price '>${product?.price}</p>}
                        <button className="add-to-bag" onClick={()=> {if(product?.id !== undefined){addToCart(product.id)}}}>Add to Bag</button>
                        <p>Description :<br/><br/>{product?.description}</p>
                    </div>
            </div>
        </div>
    )
}

export default ProductPage