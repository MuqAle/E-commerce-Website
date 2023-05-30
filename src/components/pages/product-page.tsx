import { useState } from "react"
import { useParams} from "react-router-dom"
import '../../style/css/product-page.css'
import ReactImageMagnify from "@blacklab/react-image-magnify"
import heartimg from '../../assets/imgs/svg-imgs/heart-outline.svg'
import filledheart from '../../assets/imgs/svg-imgs/heart-filled.svg'
import rightArrow from '../../assets/imgs/svg-imgs/arrow_forward_ios_FILL0_wght100_GRAD-25_opsz48.svg'
import leftArrow from '../../assets/imgs/svg-imgs/arrow_back_ios_new_FILL0_wght100_GRAD0_opsz48.svg'


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
    }[]  
}

interface Params {
    id: string;
}


const ProductPage = ({data}:ProductProp) => {

    const {id} = useParams<keyof Params>() as Params
    const product= data.find(p => p.id === id);
    const [image, setImage] = useState(0)
    const [favorite, setFavorite] = useState(false)

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

                {/* <img className = 'product-img' src={product?.Gallery[image]} alt="product-img"/> */}
                </div>
                <div className="product-info">
                    <div className="first-container">
                        <h1 className="product-name">{product?.name}</h1>
                        <button onClick={() => setFavorite(!favorite)}><img src={favorite ? filledheart : heartimg } alt="favorite-btn" /></button>
                    </div>
                    {product?.onSale ?
                    <p className='product-price product-sale-price'>${product?.salePrice.toFixed(2)} <s>${product?.price}</s> </p>
                    :
                    <p className='product-price '>${product?.price}</p>}
                    <button className="add-to-bag">Add to Bag</button>
                    <p>Description :<br/><br/>{product?.description}</p>
                </div>
        </div>
    )
}

export default ProductPage