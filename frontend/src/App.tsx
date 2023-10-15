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
import Wishlist from './pages/wish-list'
import ShoppingCart from './pages/shopping-cart-components/shopping-cart'
import ErrorPage from './pages/error-page'
import { CartTypes, LoginTypes, ProductDb, UserTypes } from './utils/types'
import { useEffect } from 'react'
import { getAllProducts } from './services/products'
import { addToCart, deleteOneCart,deleteAllProduct, getCart } from './services/cart'
import { retrieveProfile } from './services/user-req'



function App() {
  const [cart, setCart] = useImmer<CartTypes>(Object)
  const [favorite, setFavorite] = useImmer<UserTypes['wishList'][]>([])
  const [allData,setData] = useImmer<ProductDb[]>([])
  const [user,setUser] = useImmer<LoginTypes | null>(null)
  const [loginModal,setLoginModal] = useImmer(false)
  const [error,setError] = useImmer('')

  const token = user?.token ? `Bearer ${user?.token}` : null

  useEffect(() => {
    getAllProducts().then(products => setData(products))
  },[setData])

  useEffect(() => {
    const controller = new AbortController()
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    const loggedUserSessionJSON = window.sessionStorage.getItem('loggedUser')

    if(loggedUserJSON){
      const user:LoginTypes = JSON.parse(loggedUserJSON)
      setUser(user)
      getCart(`Bearer ${user.token}`).then(
        userCart => setCart(userCart)
      ).catch(err => setError('Something went wrong'))
    }if(loggedUserSessionJSON){
      const user:LoginTypes = JSON.parse(loggedUserSessionJSON)
      getCart(`Bearer ${user.token}`).then(
        userCart => setCart(userCart)
      ).catch(err => setError('Something went wrong'))
      setUser(user)
    }else{
      getCart(null).then(
        userCart => setCart(userCart)
      ).catch(err => setError('Something went wrong'))
    }
    return () => {
      controller.abort()
    }
  },[setCart, setError, setUser, token])

  useEffect(() => {
    if(user){
      retrieveProfile(token).then(
        (user) => setFavorite(user.wishList)
      )
    }
  })


  const addProductFavorite = (id:string) => {
    if(!user){
      setLoginModal(true)
      return true
    }else{
      return true
    }
  }

  const favorited = (id:string) => {
    return true
  }

  const deleteProductCart = async(id:string) => {
   const cart = await deleteAllProduct(id,token)
   
   setCart(cart)
  }

  const decreaseAmount = async(id:string) => {
    const cart = await deleteOneCart(id,token)
    setCart(cart)
  }

  const addProductCart = async(id:string,) => {
    const cart = await addToCart(id,token)
    setCart(cart)
  }

  const router= createBrowserRouter(
  
    createRoutesFromElements(
      <Route path='/' element={<RootLayout closeModal={() => setLoginModal(false)} user={user} shoppingCart={cart.cartTotal} favorites={favorite.length} showLoginModal={loginModal} setLoginModal={setLoginModal}/>}>
        <Route index element={<Home data={allData} addFavorite={addProductFavorite} addToCart={addProductCart} favorited={favorited}/>}/>
        <Route path='shop-all' element={<Catalog title='All Jewelry' data={allData} addFavorite={addProductFavorite} addToCart={addProductCart} favorited={favorited}/>}/>
        <Route path='necklace' element={<Catalog title='Necklaces' data={allData} addFavorite={addProductFavorite} addToCart={addProductCart} favorited={favorited}/>}/>
        <Route path='bracelet' element={<Catalog title='Bracelets' data={allData} addFavorite={addProductFavorite} addToCart={addProductCart} favorited={favorited}/>}/>
        <Route path='earrings' element={<Catalog  title='Earrings' data={allData} addFavorite={addProductFavorite} addToCart={addProductCart} favorited={favorited}/>}/>
        <Route path='on-sale' element={<Catalog title='On Sale' data={allData.filter(data => data.onSale === true)} addFavorite={addProductFavorite} addToCart={addProductCart} favorited={favorited}/>}/>
        <Route path='about-us' element={<AboutUs/>}/>
        <Route path='wish-list' element={<Wishlist array={favorite} addToCart={addProductCart} deleteFavorite={addProductFavorite}/>}/>
        <Route path='shopping-cart' element={<ShoppingCart cart={cart} decreaseAmount={decreaseAmount} increaseAmount={addProductCart} deleteProductCart={deleteProductCart}></ShoppingCart>}/>
        <Route path='shop-all/:id' element ={<ProductPage addToCart={addProductCart} addFavorite={addProductFavorite} favorited={favorited}/>}/>
        <Route path='necklace/:id' element ={<ProductPage addToCart={addProductCart} addFavorite={addProductFavorite} favorited={favorited}/>}/>
        <Route path='bracelet/:id' element ={<ProductPage addToCart={addProductCart } addFavorite={addProductFavorite} favorited={favorited}/>}/>
        <Route path='earrings/:id' element ={<ProductPage addToCart={addProductCart} addFavorite={addProductFavorite} favorited={favorited}/>}/>
        <Route path='on-sale/:id' element ={<ProductPage  addToCart={addProductCart} addFavorite={addProductFavorite} favorited={favorited}/>}/>
        <Route path='*' element ={<ErrorPage/>}/>
      </Route>
    )
  )
  return(
    <RouterProvider router={router}></RouterProvider>
  )
}

export default App
