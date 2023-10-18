import { ReviewType } from "../../utils/types"

const DropDownButton = ({title,filterArray,setArray}:{
    title:string,
    filterArray:ReviewType[] | undefined,
    setArray:React.Dispatch<React.SetStateAction<ReviewType[] | undefined>>}) => {


    const onClick = () => {
        setArray(filterArray)
    }
    return(
        <button onClick={onClick} className={`dropdown-btn`}>{title}</button>
    )
}

export default DropDownButton