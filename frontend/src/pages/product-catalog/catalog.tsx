import Card from "./card";
import { Link } from "react-router-dom";
import '../../style/css/catalog.css'
import heartOutline from '../../assets/imgs/svg-imgs/heart-outline.svg'
import heartFilled from '../../assets/imgs/svg-imgs/heart-filled.svg'
import shoppingBag from '../../assets/imgs/svg-imgs/shopping-bag-white.svg'
import Breadcrumbs from "../../components/breadcrumbs";
import { CatalogueTypes, ProductDb } from "../../utils/types";
import { useEffect } from "react";
import { useImmer } from "use-immer";
import { getAllProducts } from "../../services/products";
import DropDownButton from "../reviews-components/dropdown";
import arrow from '../../assets/imgs/svg-imgs/arrow_forward_ios_FILL0_wght100_GRAD-25_opsz48.svg'
import EmptyCard from "../../components/empty-card";



const Catalog = ({title,addToCart,addFavorite, favorited}:CatalogueTypes) => {

    const [products,setProducts] = useImmer<ProductDb[]>([])
    const [openSort, setOpenSort] = useImmer(false)
    const [page, setPage] = useImmer(1)
    const [totalProducts, setTotalProducts] = useImmer(0)
    const [sortProducts,setSortProducts] = useImmer('-createdAt')
    const [filterQuery,setFilterQuery] = useImmer('')
    const [isLoading,setIsLoading] = useImmer(false)
    const sortNameArray = ['Newest', 'Best Seller','Price [Low-High]','Price [High-Low]']
    const sortArray = ['-createdAt','-sold','price','-price']



    useEffect(() => {
        const controller = new AbortController()
        setIsLoading(true)
        getAllProducts(page,sortProducts).then(products => {
            const newProducts = products.product as ProductDb[]
            const newTotalProducts = products.totalProducts as number
            
            setProducts(products => [...products,...newProducts])
            
            setTotalProducts(newTotalProducts)
        }).catch(err => console.log(err))
        .finally(() => setIsLoading(false))
        
        return () => {
          controller.abort()
        }
      },[page, setIsLoading, setPage, setProducts, setTotalProducts, sortProducts])


        return (
            <div className="container">
                <Breadcrumbs name={null}/>
                <h1 className="title">{title}</h1>
                <div className="filter-container">
                    <h3>Filter</h3>
                    
                </div>
                <div className="sort-filter-container">
                    <button className="filter-btn">Filter</button>
                    <div className={openSort ? "sort-catalogue active" : "sort-catalogue"}>
                        <button  className="dropdown-toggle-btn" onClick={() => setOpenSort(!openSort)}>Sort
                        <img src={arrow}/>
                        </button>
                        <div style={openSort ? {maxHeight: '1000px',transition: 'max-height 1.3s ease-in-out'}:{maxHeight:'0'}} className="dropdown-content">
                            {sortNameArray.map((name,i) => {
                                return(
                                    <DropDownButton key={i}
                                    title={name}
                                    applyActive = {() => {
                                        if(sortProducts !== sortArray[i]){
                                            setPage(1)
                                            setProducts([])
                                        }
                                        setSortProducts(sortArray[i])}}/>
                                )
                            })}
                        </div>
                    </div>
                    
                </div>
                <div className="catalog">
                    {
                    !isLoading ? 
                    products.map((d) => (
                    <div className="card-container" key={d._id}>
                        <Link className="product-link" to={d._id} >
                            <Card cardInfo={d}></Card>
                        </Link>
                    <button style = {favorited(d._id) ? {visibility:"visible", opacity:'100%'} : {visibility:'hidden', opacity:'0'}} className="left-btn" onClick={()=> addFavorite(d._id)}><img src={favorited(d._id) ? heartFilled:heartOutline} alt="add-favorite" />
                    </button>
                    <button className="right-btn" onClick={() => addToCart(d._id)}><img src={shoppingBag} alt='add-to-cart'></img></button>
                    </div>
                ))
                    :
             
                    [...Array(20)].map((card,i )=> {
                        return(
                            <div key={i} className="card-container">
                                <EmptyCard/>
                            </div>
                        )
                    })
         
            }
                </div>
                <div className="number-of-products">
                    <p>Showing {products.length} out of {totalProducts}</p>
                    {
                        products.length === totalProducts ? null :
                        <button className="load-more-btn" disabled={isLoading ? true : false} onClick={() => setPage(page + 1)}>Load More</button>
                    }
                    
                </div>
            </div>
        )  
}

export default Catalog