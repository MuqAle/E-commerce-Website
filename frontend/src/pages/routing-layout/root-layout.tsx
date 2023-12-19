import { Outlet} from "react-router-dom";
import {useEffect} from 'react'; 
import { AnimatePresence, motion } from "framer-motion";
import Header from "./header";
import Footer from "./footer";
import ScrollToTop from "../../utils/scroll-to-top";
import '../../style/css/root.css'
import Modal from "../../components/modal";
import '../../style/css/modal.css'
import '../../style/css/login.css'
import LoginModal from "../login-signup/sign-up-modal";
import { LoginTypes, ProductDb } from "../../utils/types";
import { useImmer } from "use-immer";
import disableScrollModal from "../../utils/stop-scrolling";

interface Span{
    shoppingCart:number,
    favorites:number,
    showLoginModal:boolean,
    user:LoginTypes|null,
    setLoginModal : React.Dispatch<React.SetStateAction<boolean>>
    closeModal:() => void,
    setShowSignIn : React.Dispatch<React.SetStateAction<boolean>>,
    showSignIn: boolean,
    loading:boolean,
    productAddedToCart:ProductDb,
    showCartMsg:boolean
}

const backdrop = {
  visible:{opacity:1},
  hidden:{opacity:0},
  exit:{opacity:0}
}


const RootLayout = ({
    shoppingCart,
    favorites,
    showLoginModal,
    user,
    closeModal,
    setLoginModal,
    productAddedToCart,
    loading,
    setShowSignIn,
    showSignIn,
    showCartMsg}:Span) => {

    const [showModal, setShowModal] = useImmer(false)
    
    
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
            <Header 
            setShowSignIn={setShowSignIn}
            productAddedToCart={productAddedToCart} 
            favorites={favorites} 
            shoppingCart={shoppingCart} 
            loggedUser={user} 
            logInModal={showLoginModal} 
            setLoginModal={setLoginModal} 
            showCartMsg={showCartMsg}/>
            <AnimatePresence initial={false} mode="wait" onExitComplete={() => setShowModal(false)} >
            {showModal && 
              <Modal key='modal' open={showModal} closeModal={toggleModal}/>
            }
            </AnimatePresence>
            <AnimatePresence initial={false} mode="wait" onExitComplete={closeModal} >
              {
                showLoginModal &&
                <motion.div
                variants={backdrop}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="modal" onClick={closeModal}>
                <LoginModal key='modal' signUp={showSignIn} closeModal={closeModal} user={user}/>
                </motion.div>
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