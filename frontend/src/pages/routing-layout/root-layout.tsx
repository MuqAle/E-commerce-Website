import { Outlet } from "react-router-dom";
import { useState, useEffect } from 'react'; 
import { AnimatePresence } from "framer-motion";
import Header from "./header";
import Footer from "./footer";
import ScrollToTop from "../../utils/scroll-to-top";
import '../../style/css/root.css'
import Modal from "../../components/modal";

interface Span{
    shoppingCart:number,
    favorites:number
}

const RootLayout = ({shoppingCart,favorites}:Span) => {

    const [showModal, setShowModal] = useState(false);
    
    const preventScroll = (event: TouchEvent) => {
      event.preventDefault();
    }; 

    useEffect(() => {
      const visitedBefore = sessionStorage.getItem('visitedBefore');
  
      if (!visitedBefore) {
        const timer = setTimeout(() => {
          setShowModal(true);
          sessionStorage.setItem('visitedBefore', 'true');
        }, 1500);
  
        return () => {
          clearTimeout(timer);
        };
      }
    }, []);

    useEffect(() => {
      const body = document.querySelector("body")
      if(body){
          body.style.overflow = showModal ? 'hidden' : 'visible';
          showModal ? body.addEventListener("touchmove", preventScroll, { passive: false }) : body.removeEventListener("touchmove", preventScroll)
      }

      return () => {
        document.body.removeEventListener("touchmove", preventScroll);
      };
    }, [showModal])

    
  
    const toggleModal = () => {
      setShowModal(modal => !modal);
    };

    return(
        <div id="main-container">
            <ScrollToTop/>
            <div className="sign-up-header">Get 10% Off Your Next Order When You <button onClick={toggleModal}>Sign Up!</button></div>
            <Header favorites={favorites} shoppingCart={shoppingCart}/>
            <AnimatePresence initial={false} mode="wait" onExitComplete={() => setShowModal(false)}>
            {showModal && 
              <Modal key='modal' open={showModal} closeModal={toggleModal}/>
            }
            </AnimatePresence>
            <main>
                <Outlet/>
            </main>
            <Footer/>
        </div>
    )
}

export default RootLayout