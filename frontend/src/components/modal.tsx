import { motion } from "framer-motion"
import img from '../assets/imgs/front-page-imgs/nati-melnychuk-Ki7TPcA9204-unsplash.jpg'
import arrow from '../assets/imgs/svg-imgs/arrow.svg'



interface Modal{
    closeModal:() => void
    open:boolean
}

const backdrop = {
  visible:{opacity:1},
  hidden:{opacity:0},
  exit:{opacity:0}
}

const Modal = ({closeModal}:Modal) => {

  return (
        <motion.div 
        variants={backdrop}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="modal" onClick={closeModal}>
          <div className={'modal-content'} onClick={e => e.stopPropagation()}>
          <button className="close-modal" onClick={closeModal}>&times;</button>
            <div className="modal-img"><img src={img} alt="2 gold earrings"/></div>
            <div className='modal-form'>
              <h2>
                Get 10% Off
              </h2>
              <p>
                Sign up to receive exclusive deals and much more!
              </p>
              <div className="modal-input-box">
                    <input className="modal-signup" placeholder="Enter your email address"></input>
                    <button onClick={closeModal} type="submit"><img src={arrow} alt="arrow"/> </button>
                </div>
                <div className="modal-checkbox-container">
                    <input type="checkbox" id='modal-sign-up-checkbox'></input>
                    <label className="modal-sign-up-checkbox-label" htmlFor="modal-sign-up-checkbox">By signing up you agree to our <a>Privacy Policy</a></label>
                </div>
            </div>
          </div>
        </motion.div>
  );
};

export default Modal;