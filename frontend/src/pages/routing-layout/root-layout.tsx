import { Outlet, useLocation } from "react-router-dom";
import {useEffect} from 'react'; 
import { AnimatePresence } from "framer-motion";
import Header from "./header";
import Footer from "./footer";
import ScrollToTop from "../../utils/scroll-to-top";
import '../../style/css/root.css'
import Modal from "../../components/modal";
import '../../style/css/modal.css'
import '../../style/css/login.css'
import LoginModal from "../login-signup/sign-up-modal";
import { LoginTypes } from "../../utils/types";
import { useImmer } from "use-immer";
import disableScrollModal from "../../utils/stop-scrolling";

interface Span{
    shoppingCart:number,
    favorites:number,
    showLoginModal:boolean,
    user:LoginTypes|null
    setLoginModal : React.Dispatch<React.SetStateAction<boolean>>
    closeModal:() => void,
    loading:boolean
}


const RootLayout = ({
    shoppingCart,
    favorites,
    showLoginModal,
    user,
    closeModal,
    setLoginModal,
    loading}:Span) => {

    const [showModal, setShowModal] = useImmer(false);
    
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
      disableScrollModal(showModal)
   
    }, [ showModal])

    useEffect(() => {
      disableScrollModal(showLoginModal)
    },[showLoginModal])

    useEffect(() => {
      disableScrollModal(loading)
   
    }, [loading])


  
    const toggleModal = () => {
      setShowModal(modal => !modal);
    }

    return(
        <div id="main-container">
              {loading &&
                  <div className="loader-container">
                  <div className="loader"></div>
                  </div>
              }
            <ScrollToTop/>
            <div className="sign-up-header">Get 10% Off Your Next Order When You <button onClick={toggleModal}>Sign Up!</button></div>
            <Header favorites={favorites} shoppingCart={shoppingCart} loggedUser={user} logInModal={showLoginModal} setLoginModal={setLoginModal}/>
            <AnimatePresence initial={false} mode="wait" onExitComplete={() => setShowModal(false)} >
            {showModal && 
              <Modal key='modal' open={showModal} closeModal={toggleModal}/>
            }
            </AnimatePresence>
            <AnimatePresence initial={false} mode="wait" onExitComplete={closeModal} >
              {
                showLoginModal &&
                <LoginModal key='modal' closeModal={closeModal} user={user}/>
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