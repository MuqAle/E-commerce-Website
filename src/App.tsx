import {
  createBrowserRouter,
  Route,
  RouterProvider,
  createRoutesFromElements
} from 'react-router-dom'
import RootLayout from './components/routing-layout/root-layout'
import Home from './components/pages/landing-page'
import Catalog from './components/pages/product-catalog/catalog'
import ProductPage from './components/pages/product-page'
import allData from './assets/data/all-products'
import necklaceData from './assets/data/necklace-data'
import braceletData from './assets/data/bracelet-data'
import earringData from './assets/data/earrings-data'


const router= createBrowserRouter(
  
  createRoutesFromElements(
    <Route path='/' element={<RootLayout/>}>
      <Route index element={<Home/>}/>
      <Route path='shop-all' element={<Catalog title='All Jewelry' data={allData} addFavorite={() => console.log('hi')} addToCart={() => console.log('hi')}/>}/>
      <Route path='necklaces' element={<Catalog title='Necklaces' data={necklaceData} addFavorite={() => console.log('hi')} addToCart={() => console.log('hi')}/>}/>
      <Route path='bracelets' element={<Catalog title='Bracelets' data={braceletData} addFavorite={() => console.log('hi')} addToCart={() => console.log('hi')}/>}/>
      <Route path='earrings' element={<Catalog  title='Earrings' data={earringData} addFavorite={() => console.log('hi')} addToCart={() => console.log('hi')}/>}/>
      <Route path='on-sale' element={<Catalog title='On Sale' data={allData.filter(data => data.onSale === true)} addFavorite={() => console.log('hi')} addToCart={() => console.log('hi')}/>}/>
      {/* <Route path='about-us' element={<About/>}/> */}
      <Route path='shop-all/:id' element ={<ProductPage data={allData}/>}/>
      <Route path='necklaces/:id' element ={<ProductPage data={necklaceData}/>}/>
      <Route path='bracelets/:id' element ={<ProductPage data={braceletData}/>}/>
      <Route path='earrings/:id' element ={<ProductPage data={earringData}/>}/>
      <Route path='on-sale/:id' element ={<ProductPage data={allData.filter(data => data.onSale === true)}/>}/>
    </Route>
  )
)

function App() {
  return(
    <RouterProvider router={router}></RouterProvider>
  )
}

export default App
