import { useState } from "react"
import { useParams} from "react-router-dom"
import '../../style/css/product-page.css'
import ReactImageMagnify from "@blacklab/react-image-magnify"
import { AnimatePresence,motion } from "framer-motion"
import heartimg from '../../assets/imgs/svg-imgs/heart-outline.svg'

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

    const product = data.find(p => p.id === id);
    const [image, setImage] = useState(0)

    return(
        <div className="product-page">
            <div className="product-images">
                <div className="gallery">
                    {product?.Gallery.map((i,index) => 
                    <button key={index} className="image-button" onClick={() => setImage(index)}><img  src={i} alt="image-button"/></button>)}
                </div>
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

                {/* <img className = 'product-img' src={product?.Gallery[image]} alt="product-img"/> */}
                </div>
                <div className="product-info">
                    <div className="first-container">
                        <h1 className="product-name">{product?.name}</h1>
                        <button><img src={heartimg} alt="favorite-btn" /></button>
                    </div>
                    {product?.onSale ?
                    <p className='product-price product-sale-price'>${product?.salePrice.toFixed(2)} <s>${product?.price}</s> </p>
                    :
                    <p className='product-price '>${product?.price}</p>}
                    <button className="add-to-bag">Add to Bag</button>
                    <p>Description : {product?.description}</p>
                </div>
        </div>
    )
}

export default ProductPage