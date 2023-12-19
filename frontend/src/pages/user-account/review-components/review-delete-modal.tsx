import { motion } from "framer-motion"

const backdrop = {
    visible:{opacity:1},
    hidden:{opacity:0},
    exit:{opacity:0}
  }

const DeleteReviewModal = ({yesFnc,closeModal,productName,successMessage,disableBtn}:
    {
    yesFnc:() => void,
    closeModal:() => void,
    productName:string,
    successMessage:boolean,
    disableBtn:boolean}) => {

    return(
        <motion.div
        variants={backdrop}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="modal" onClick={closeModal}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <p>Are you sure you want to delete your  review for '{productName}'?</p>
                <div className="delete-btns">
                    <button disabled={disableBtn} onClick={yesFnc}>Yes</button>
                    <button disabled={disableBtn} onClick={closeModal}>No</button>
                </div>
                {
                    successMessage ?
                    <p className="success-delete" style={{color:'green'}}>Your Review Was Successfully Deleted</p> :
                    null
                }
            </div>
            
        </motion.div>
    )
}

export default DeleteReviewModal