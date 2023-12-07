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
import { useLocation, useNavigate } from "react-router";
import EmptyCard from "../../components/empty-card";
import CatalogHeader from "./catalog-header";
import { AnimatePresence } from "framer-motion";




export interface FilterQueryType {
    metal:string[],
    minPrice:string,
    maxPrice:string,
    colors:string[],
}

export interface FilterArray {
    filter:string,
    count:number
}

interface FilterCountType {
    metal:FilterArray[],
    colors:FilterArray[],
    priceRange:FilterArray[]

}

const Catalog = ({title,addToCart,addFavorite,favorited,setLoading}:CatalogueTypes) => {

    const navigate = useNavigate()
    const location = useLocation()


    const [products,setProducts] = useImmer<ProductDb[]>([])
    const [productFilterCounts,setProductFilterCounts] = useImmer<Partial<FilterCountType>>({})
    const [initialCounts,setInitialCounts] = useImmer<Partial<FilterCountType>>({})
    const [trackFilter,setTrackFilter] = useImmer('')
    const [page, setPage] = useImmer(1)
    const [filtersApplied,setFiltersApplied] = useImmer<Partial<FilterQueryType>>({})
    const [totalProducts, setTotalProducts] = useImmer(0)
    const [sortProducts,setSortProducts] = useImmer('-createdAt')
    const [isLoading,setIsLoading] = useImmer(true)
    const sortNameArray = ['Newest', 'Best Seller','Highest Rated','Price [Low-High]','Price [High-Low]']
    const sortArray = ['-createdAt','-sold','-overallRating','price','-price']



    const generateQueryString = () => {

        const params = {} as Record<string, string>

        for (const [key, value] of Object.entries(filtersApplied)) {
            if(typeof value === 'string'){
                params[key] = value
            }else{
                params[key] = value.join(',')
            }
          }
        const queryParams = new URLSearchParams(params)
        return queryParams.toString()
      }

    const generateFilterQuery = () => {
        const locationPath = location.pathname.slice(1)
        let param = ''
        if(locationPath === 'shop-all'){
            param
        }
        else if(locationPath === 'on-sale'){
            param = '&onSale=true'
        }else if(locationPath === 'search' ){
            param = `keyword=${window.sessionStorage.getItem('searchItem')}`
        }
        else{
            param = `&category=${locationPath}`
        }
        
        return param
    }

    
    useEffect(() => {
        setIsLoading(true)
    },[])


    useEffect(() => {
        const controller = new AbortController()
        const query = `?${generateFilterQuery()}&page=${page}&sort=${sortProducts}&${generateQueryString()}`
        navigate({
            pathname:location.pathname,
            search:query
        })
        getAllProducts(query).then(products => {
            const newProducts = products.product as ProductDb[]
            const newTotalProducts = products.totalProducts as number
            const filterCounts = products.productAggregate[0]
            setProducts(products => [...products,...newProducts])
            setTotalProducts(newTotalProducts)
            
            if(Object.keys(filtersApplied).length === 0){
                setProductFilterCounts(filterCounts)
                setInitialCounts(filterCounts)
            }if(newTotalProducts === 0){
                setProductFilterCounts({})
            }
            else{
                const productCounts = {...filterCounts}

                productCounts[trackFilter] = productFilterCounts[trackFilter as keyof Partial<FilterCountType>]
                
                if(Object.keys(filtersApplied).length === 1){
                   const filter = Object.keys(filtersApplied)[0] as keyof Partial<FilterCountType> | 'minPrice'
                   const key  = filter === 'minPrice' ? 'priceRange' : filter 
                   productCounts[key] = initialCounts[key]
                }
                if(Object.keys(filtersApplied).length === 2 && Object.keys(filtersApplied)[1] === 'maxPrice'){
                    productCounts['priceRange'] = initialCounts['priceRange']
                }
                setProductFilterCounts(productCounts)
            }
        }).catch(err => console.log(err))
        .finally(() => {
            setIsLoading(false)
            setLoading(false)})
        
        return () => {
          controller.abort()
        }

      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[ page,
        setIsLoading,
        setFiltersApplied,
        filtersApplied,
        setPage, 
        setProductFilterCounts,
        setProducts, 
        setTotalProducts, 
        sortProducts])

 




      const sortFnc = (i:number) => {
        if(sortProducts !== sortArray[i]){
            setLoading(true)
            setPage(1)
            setProducts([])
        }
        setSortProducts(sortArray[i])
      }



      const filterFnc = (key:keyof Partial<FilterQueryType>,e:React.ChangeEvent<HTMLInputElement>) => {
        setLoading(true)
        setPage(1)
        setProducts([])
        setTrackFilter(key)

        const updatedFilter = { ...filtersApplied } as Partial<FilterQueryType>
        if(updatedFilter[key]){
            if(e.target.checked){
                (updatedFilter[key] as string[]).push(e.target.value)
            }else{
                (updatedFilter[key] as string[])  = (updatedFilter[key] as string[]).filter(f => f !== e.target.value)
                if((updatedFilter[key] as string[]).length === 0){
                    delete updatedFilter[key]
                }
            }
        }else{
            (updatedFilter[key] as string[]) = [e.target.value]
        }
        setFiltersApplied(updatedFilter)
      }

      const updatePriceFilter =(key:keyof Partial<FilterQueryType>,e:React.ChangeEvent<HTMLInputElement>) => {
        setLoading(true)
        setPage(1)
        setProducts([])
        setTrackFilter(key)

        const updatedFilter = { ...filtersApplied } as Partial<FilterQueryType>
        if(e.target.checked){
            const filter = e.target.value.split(',')
            if(filter.length === 2){
                updatedFilter.minPrice = filter[0]
                updatedFilter.maxPrice = filter[1]
            }else{
                updatedFilter.minPrice = e.target.value 
                if(updatedFilter.maxPrice){
                    delete updatedFilter.maxPrice
                } 
            }
        }else{
            delete updatedFilter.minPrice 
            delete updatedFilter.maxPrice
        }
        setFiltersApplied(updatedFilter)
      }

      const clearFilters = () => {
        setLoading(true)
        setPage(1)
        setProducts([])
        setFiltersApplied({})
        setSortProducts('-createdAt')
      }

      const addToCartFnc = async(id:string) => {
        try{
            setLoading(true)
            await addToCart(id) 
        }catch(err){
            console.log(err)
        }finally{
            setLoading(false)
        }
      }

      const addToFavoriteFnc = async(id:string) => {
        try{
            setLoading(true)
            await addFavorite(id)
        }catch(err){
            console.log(err)
        }finally{
            setLoading(false)
        }
      }

        return (
            <div className="container">
                <Breadcrumbs name={null}/>
                <h1 className="title">{title}</h1>
                <AnimatePresence>
                <CatalogHeader 
                sortApplied={sortProducts}
                sortArray={sortArray}
                filtersApplied={filtersApplied}
                clearFilters={clearFilters}
                priceFilterFnc={updatePriceFilter}
                filterFnc={filterFnc}
                filterColor={productFilterCounts.colors && productFilterCounts.colors || []}
                filterMetal={productFilterCounts.metal && productFilterCounts.metal || []}
                filterPrice = {productFilterCounts.priceRange && productFilterCounts.priceRange || []}
                sortNameArray={sortNameArray}
                sortFnc={sortFnc}/>
                </AnimatePresence>
                <div className="catalog">
                    {
                    !isLoading ? 
                    products.map((d) => (
                    <div className="card-container" key={d._id}>
                        <Link className="product-link" to={d._id} >
                            <Card cardInfo={d}></Card>
                        </Link>
                    <button style = {favorited(d._id) ? {visibility:"visible", opacity:'100%'} : {visibility:'hidden', opacity:'0'}} className="left-btn" onClick={()=> addToFavoriteFnc(d._id)}><img src={favorited(d._id) ? heartFilled:heartOutline} alt="add-favorite" />
                    </button>
                    <button className="right-btn" onClick={() => {addToCartFnc(d._id)}}><img src={shoppingBag} alt='add-to-cart'></img></button>
                    </div>
                    ))
                    :
             
                    [...Array(20)].map((_card,i )=> {
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
                        <button className="load-more-btn" disabled={isLoading ? true : false} onClick={() => {
                            setLoading(true)
                            setPage(page + 1)}}>Load More</button>
                    }
                    
                </div>
            </div>
        )  
}

export default Catalog