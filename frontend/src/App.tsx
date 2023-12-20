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
import { useCallback, useEffect, useRef } from 'react'
import { addToCart, deleteOneCart,deleteAllProduct, getCart } from './services/cart'
import { addOrDeleteFromWishlist, retrieveProfile } from './services/user-req'
import UserLayout from './pages/user-account/root-layout'
import UserOrder from './pages/user-account/order-invoice-components/orders'
import UserReviews from './pages/user-account/review-components/reviews'
import Profile from './pages/user-account/profile'
import OrderSummary from './pages/user-account/order-invoice-components/order-summary'
import LoginPage from './pages/login-page'
import OrderSuccess from './pages/order-success'



function App() {
  const [cart, setCart] = useImmer<CartTypes>(Object)
  const [favorite, setFavorite] = useImmer<UserTypes['wishList']>([])
  const [user,setUser] = useImmer<LoginTypes | null>(null)
  const [userProfile,setUserProfile] = useImmer<UserTypes | null>(null)
  const [loginModal,setLoginModal] = useImmer(false)
  const [showSignIn,setShowSignIn] = useImmer(true)
  const [error,setError] = useImmer(false)
  const [loading,setLoading] = useImmer(false)
  const [showAddToCart, setShowAddToCart] = useImmer(false)
  const [lastAddedToCart, setLastAddedToCart] = useImmer<ProductDb>(Object)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  
  const token = user?.token ? `Bearer ${user?.token}` : null
  
  const errorHandler = useCallback(() => {
    setError(true)
    setTimeout(() => {
      setError(false)
    },4000)
  },[setError])


  useEffect(() => {
    const controller = new AbortController()
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    const loggedUserSessionJSON = window.sessionStorage.getItem('loggedUser')

    if(loggedUserJSON){
      const user:LoginTypes = JSON.parse(loggedUserJSON)
      setUser(user)
      getCart(`Bearer ${user.token}`).then(
        userCart => setCart(userCart)
      ).catch(() => errorHandler())

    }if(loggedUserSessionJSON){
      const user:LoginTypes = JSON.parse(loggedUserSessionJSON)
      getCart(`Bearer ${user.token}`).then(
        userCart => setCart(userCart)
      ).catch(() => errorHandler())
      setUser(user)
    }else{
      getCart(null).then(
        userCart => setCart(userCart)
      ).catch(() => errorHandler())
    }
    return () => {
      controller.abort()
    }
  },[errorHandler, setCart, setUser, token])

  useEffect(() => {
    const controller = new AbortController()
    if(user){
      retrieveProfile(token).then(
        (user) => {
          setUserProfile(user)
          setFavorite(user.wishList)
        }
      ).catch(() => errorHandler())
    }

    return () => {
      controller.abort()
    }
  },[errorHandler, setFavorite, setUserProfile, token, user])

  const openLoginModal = () => {
    if(!user){
      setLoginModal(true)
    }
    return
  }



  const addProductFavorite = async(id:string) => {
    if(!user){
      setLoginModal(true)
      return
    }else{
      try{
        setLoading(true)
        const user = await addOrDeleteFromWishlist(id,token) as UserTypes
        setFavorite(user.wishList)
      }catch(err){
        errorHandler
      }finally{
        setLoading(false)
      }
    }
  }

  const favorited = (id:string) => {
    const idArray = favorite.map(product => product._id)
    const product = idArray.includes(id)
    return product
  }

  const deleteProductCart = async(id:string) => {
    try{
      setLoading(true)
      const cart = await deleteAllProduct(id,token)
      setCart(cart)
    }catch(err){
      errorHandler()
    }finally{
      setLoading(false)
    }
  
  }

  const decreaseAmount = async(id:string) => {
    try{
      setLoading(true)
      const cart = await deleteOneCart(id,token)
      setCart(cart)
    }catch(err){
      errorHandler()
    }finally{
      setLoading(false)
    }

  }



  const addProductCart = async(id:string,) => {
   
    try{
      setLoading(true)
      const cart = await addToCart(id,token) as CartTypes
      setCart(cart)
      const foundProduct = cart.products.find(product => product.product._id === id)
      foundProduct && setLastAddedToCart(foundProduct.product)
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    }catch(err){
      errorHandler()
    }finally{
      setLoading(false)
      setShowAddToCart(true)
      timerRef.current = setTimeout(() => {
        setShowAddToCart(false)
      },4500)
    }
  
  }

  const moveToWishlist = async(id:string) => {
    if(!user){
      setLoginModal(true)
      return
    }else{
      try{
        setLoading(true)
        const user = await addOrDeleteFromWishlist(id,token) as UserTypes
        setFavorite(user.wishList)
        const cart = await deleteAllProduct(id,token)
        setCart(cart) 
      }catch(err){
        errorHandler()
      }finally{
        setLoading(false)
      }
    }
  }




  const router= createBrowserRouter(
  
    createRoutesFromElements(
      <Route path='/' element={<RootLayout 
        error={error}
        showSignIn={showSignIn}
        setShowSignIn={setShowSignIn}
        productAddedToCart={lastAddedToCart}
        loading={loading}
        closeModal={() => {
          setShowSignIn(true)
          setLoginModal(false)}} 
        user={user} 
        shoppingCart={cart.cartTotal} 
        favorites={favorite.length} 
        showLoginModal={loginModal} 
        setLoginModal={setLoginModal}
        showCartMsg={showAddToCart}/>}>
        <Route index element={<Home addFavorite={addProductFavorite} addToCart={addProductCart} favorited={favorited}/>}/>
        <Route path='shop-all' element={<Catalog setLoading={setLoading}  title='All Jewelry'  addFavorite={addProductFavorite} addToCart={addProductCart} favorited={favorited}/>}/>
        <Route path='necklace' element={<Catalog setLoading={setLoading}  title='Necklaces'  addFavorite={addProductFavorite} addToCart={addProductCart} favorited={favorited}/>}/>
        <Route path='bracelet' element={<Catalog setLoading={setLoading}  title='Bracelets'  addFavorite={addProductFavorite} addToCart={addProductCart} favorited={favorited}/>}/>
        <Route path='earrings' element={<Catalog setLoading={setLoading}  title='Earrings'  addFavorite={addProductFavorite} addToCart={addProductCart} favorited={favorited}/>}/>
        <Route path='on-sale' element={<Catalog  setLoading={setLoading}  title='On Sale' addFavorite={addProductFavorite} addToCart={addProductCart} favorited={favorited}/>}/>
        <Route path='about-us' element={<AboutUs/>}/>
        <Route path='wish-list' element={<Wishlist array={favorite} user={user} addToCart={addProductCart} deleteFavorite={addProductFavorite}/>}/>
        <Route path='shopping-cart' element={<ShoppingCart 
          favorited={favorited} 
          setLoading={setLoading} 
          cart={cart} 
          decreaseAmount={decreaseAmount} 
          increaseAmount={addProductCart} 
          deleteProductCart={deleteProductCart} 
          token={token}
          moveToWishlist={moveToWishlist}/>}/>
        <Route path='search' 
          element = {<Catalog setLoading={setLoading} 
          title={`Search '${window.sessionStorage.getItem('searchItem')}'`} 
          addFavorite={addProductFavorite} 
          addToCart={addProductCart} 
          favorited={favorited}/>}/>
        <Route path='login' element ={<LoginPage user={user}/>}/>
        <Route path='shop-all/:id' element ={<ProductPage 
          userReviews={userProfile?.reviews} 
          user={user} loginFnc={openLoginModal} 
          addToCart={addProductCart} 
          addFavorite={addProductFavorite} 
          favorited={favorited} />}/>
        <Route path='necklace/:id' element ={<ProductPage 
          userReviews={userProfile?.reviews} 
          user={user} 
          loginFnc={openLoginModal}  
          addToCart={addProductCart} 
          addFavorite={addProductFavorite} 
          favorited={favorited}/>}/>
        <Route path='bracelet/:id' element ={<ProductPage 
          userReviews={userProfile?.reviews} 
          user={user} 
          loginFnc={openLoginModal} 
          addToCart={addProductCart } 
          addFavorite={addProductFavorite} 
          favorited={favorited}/>}/>
        <Route path='earrings/:id' element ={<ProductPage 
          userReviews={userProfile?.reviews} 
          user={user} 
          loginFnc={openLoginModal} 
          addToCart={addProductCart} 
          addFavorite={addProductFavorite} 
          favorited={favorited}/>}/>
        <Route path='on-sale/:id' element ={<ProductPage  
          userReviews={userProfile?.reviews}  
          user={user} 
          loginFnc={openLoginModal}  
          addToCart={addProductCart} 
          addFavorite={addProductFavorite} 
          favorited={favorited}/>}/>
        <Route path='user-account'  element={<UserLayout/>}>
        <Route path='profile' element={<Profile 
          token={token}
          firstName={userProfile?.firstName} 
          lastName={userProfile?.lastName} 
          email={userProfile?.email || ''} />}/>
          <Route path='orders' element={<UserOrder orders={userProfile?.orders || []}/>}/>
          <Route path='reviews' element={<UserReviews token={token} reviews={userProfile?.reviews || []}/>}/>
        </Route>
        <Route path='user-account/orders/:id' element={<OrderSummary/>}/>
        <Route path='order-success' element={<OrderSuccess/>}/>
        <Route path='*' element ={<ErrorPage/>}/>
      </Route>
    )
  )
  return(
    <RouterProvider router={router}></RouterProvider>
  )
}

export default App
