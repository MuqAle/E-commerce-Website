import {
  createBrowserRouter,
  Route,
  RouterProvider,
  createRoutesFromElements
} from 'react-router-dom'
import { useImmer} from 'use-immer'
import RootLayout from './pages/routing-layout/root-layout'
import Home from './pages/landing-page-components/landing-page'
import Catalog from './pages/product-catalog/catalog'
import ProductPage from './pages/product-page'
import AboutUs from './pages/about-us'
import allData from './assets/data/all-products'
import necklaceData from './assets/data/necklace-data'
import braceletData from './assets/data/bracelet-data'
import earringData from './assets/data/earrings-data'
import {containsCartObject,containsFavoriteObject} from './utils/find-match'
import Wishlist from './pages/wish-list'
import ShoppingCart from './pages/shopping-cart-components/shopping-cart'
import ErrorPage from './pages/error-page'

interface WebsiteProp {
  cart:{product:{name:string,
    id:string,
    type:string,
    price:number,
    onSale:boolean,
    salePrice:number,
    description:string,
    Gallery:string[]}
    amount:number
  },
  favorite:{
    name:string,
    id:string,
    type:string,
    price:number,
    onSale:boolean,
    salePrice:number,
    description:string,
    Gallery:string[],
  }
}



function App() {
  const [cart, updateCart] = useImmer<WebsiteProp["cart"][]>([])
  const [favorite, updateFavorite] = useImmer<WebsiteProp['favorite'][]>([])

  const addProductCart = (id:string) => {
    const foundProduct =  allData.find(d => d.id === id)
    const index = cart.findIndex(c => c.product.id === id)
    if(foundProduct && containsCartObject(cart,foundProduct)){
      updateCart(c => {c[index].amount += 1 })
    }else 
    if(foundProduct){
      updateCart(c => {c.push({
        product:foundProduct,
        amount:1
      })
    })
    }
  }

  const addProductFavorite = (id:string) => {
    const foundProduct =  allData.find(d => d.id === id)
    const favoriteProduct = favorite.find(d => d.id === id)
    const index = favorite.findIndex(f => f.id === id)
     if(foundProduct && !containsFavoriteObject(favorite,foundProduct)){
      updateFavorite(f => {
        f.push(foundProduct)
      })
    }if(favoriteProduct && containsFavoriteObject(favorite,favoriteProduct)){
      updateFavorite(f => {
        f.splice(index,1)})
    }
  }

  const favorited = (id:string|undefined) => {
    const product = favorite.find(f => f.id === id)
    if(product && containsFavoriteObject(favorite,product)){
      return true
    }else{
      return false
    }
  }

  const deleteProductCart = (id:string) => {
    const index = cart.findIndex(c => c.product.id === id)
    updateCart(c => {
       c.splice(index,1)
    })
  }

  const increaseAmount = (id:string) => {
    updateCart(bag => {
      const product = bag.find(c => c.product.id === id)
      if(product){
        product.amount += 1
      }
    })
  }

  const decreaseAmount = (id:string) => {
    updateCart(bag => {
      const product = bag.find(c => c.product.id === id)
      const index = bag.findIndex(c => c.product.id === id)
      if(product && product.amount > 1){
        product.amount -= 1
      }else{
        bag.splice(index,1)
      }
    })
  }



  const router= createBrowserRouter(
  
    createRoutesFromElements(
      <Route path='/' element={<RootLayout shoppingCart={cart.reduce((a,b) => a + b.amount, 0)} favorites = {favorite.length}/>}>
        <Route index element={<Home addFavorite={addProductFavorite} addToCart={addProductCart} favorited={favorited}/>}/>
        <Route path='shop-all' element={<Catalog title='All Jewelry' data={allData} addFavorite={addProductFavorite} addToCart={addProductCart} favorited={favorited}/>}/>
        <Route path='necklace' element={<Catalog title='Necklaces' data={necklaceData} addFavorite={addProductFavorite} addToCart={addProductCart} favorited={favorited}/>}/>
        <Route path='bracelet' element={<Catalog title='Bracelets' data={braceletData} addFavorite={addProductFavorite} addToCart={addProductCart} favorited={favorited}/>}/>
        <Route path='earrings' element={<Catalog  title='Earrings' data={earringData} addFavorite={addProductFavorite} addToCart={addProductCart} favorited={favorited}/>}/>
        <Route path='on-sale' element={<Catalog title='On Sale' data={allData.filter(data => data.onSale === true)} addFavorite={addProductFavorite} addToCart={addProductCart} favorited={favorited}/>}/>
        <Route path='about-us' element={<AboutUs/>}/>
        <Route path='wish-list' element={<Wishlist array={favorite} addToCart={addProductCart} deleteFavorite={addProductFavorite}/>}/>
        <Route path='shopping-cart' element={<ShoppingCart array={cart} decreaseAmount={decreaseAmount} increaseAmount={increaseAmount} deleteProductCart={deleteProductCart}></ShoppingCart>}/>
        <Route path='shop-all/:id' element ={<ProductPage data={allData} addToCart={addProductCart} addToFavorite={addProductFavorite} favorited={favorited}/>}/>
        <Route path='necklace/:id' element ={<ProductPage data={necklaceData} addToCart={addProductCart} addToFavorite={addProductFavorite} favorited={favorited}/>}/>
        <Route path='bracelet/:id' element ={<ProductPage data={braceletData} addToCart={addProductCart } addToFavorite={addProductFavorite} favorited={favorited}/>}/>
        <Route path='earrings/:id' element ={<ProductPage data={earringData} addToCart={addProductCart} addToFavorite={addProductFavorite} favorited={favorited}/>}/>
        <Route path='on-sale/:id' element ={<ProductPage data={allData.filter(data => data.onSale === true)} addToCart={addProductCart} addToFavorite={addProductFavorite} favorited={favorited}/>}/>
        <Route path='*' element ={<ErrorPage/>}/>
      </Route>
    )
  )
  return(
    <RouterProvider router={router}></RouterProvider>
  )
}

export default App
