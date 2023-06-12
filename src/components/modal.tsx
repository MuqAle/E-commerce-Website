import img from '../assets/imgs/front-page-imgs/nati-melnychuk-Ki7TPcA9204-unsplash.jpg'
import arrow from '../assets/imgs/svg-imgs/arrow.svg'
import '../style/css/modal.css'

interface Modal{
    closeModal:() => void
}


const Modal = ({closeModal}:Modal) => {


  return (
        <div className="modal">
          <div className="modal-content">
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
        </div>
  );
};

export default Modal;