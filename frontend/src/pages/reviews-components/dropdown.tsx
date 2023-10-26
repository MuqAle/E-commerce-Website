
const DropDownButton = ({title,applyActive}:{
    title:string,
    applyActive:() => void}) => {
        

    return(
        <button onClick={applyActive} className={`dropdown-btn`}>{title}</button>
    )
}

export default DropDownButton