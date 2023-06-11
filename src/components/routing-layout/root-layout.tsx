import { Outlet } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";
import ScrollToTop from "../../utils/scroll-to-top";


import '../../style/css/root.css'

interface Span{
    shoppingCart:number,
    favorites:number
}

const RootLayout = ({shoppingCart,favorites}:Span) => {

    return(
        <div id="main-container">
            <ScrollToTop/>
            <div className="sign-up-header">Get 10% Off Your First Order When You <button>Sign Up!</button></div>
            <Header favorites={favorites} shoppingCart={shoppingCart}/>
            <main>
                <Outlet/>
            </main>
            <Footer/>
        </div>
    )
}

export default RootLayout